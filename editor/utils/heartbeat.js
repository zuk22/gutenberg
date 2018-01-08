import store from '../store';
import {
	getCurrentPost,
	getEditedPostTitle,
	getEditedPostExcerpt,
	getEditedPostContent,
} from '../store/selectors';
import {
	toggleAutosave,
	removeNotice,
	toggleNetworkIsConnected,
	showDisconnectionNotice,
	showLocalSaveNotice,
} from '../store/actions';

import { compact } from 'lodash';

/**
 * WordPress dependencies
 */
import { doAction } from '@wordpress/hooks';

const DISCONNECTION_NOTICE_ID = 'DISCONNECTION_NOTICE_ID';

export function setupHeartbeat() {
	const $document = jQuery( document );
	/**
	 * Configure heartbeat to refresh the wp-api nonce, keeping the editor authorization intact.
	 *
	 * @todo update the _wpnonce used by autosaves.
	 */
	$document.on( 'heartbeat-tick', ( event, response ) => {
		if ( response[ 'rest-nonce' ] ) {
			window.wpApiSettings.nonce = response[ 'rest-nonce' ];
		}
	} );

	/**
	 * Concatenate the title, content and excerpt.
	 *
	 * This is used to track changes when auto-saving.
	 *
	 * @since 1.9.0
	 *
	 * @param {Object} state The current state.
	 *
	 * @returns {string} A concatenated string with title, content and excerpt.
	 */
	const getCompareString = function( state ) {
		return compact( [
			getEditedPostTitle( state ),
			getEditedPostContent( state ),
			getEditedPostExcerpt( state ),
		] ).join( '::' );
	};

	/**
	 * Configure Heartbeat autosaves.
	 */
	const { dispatch, getState } = store;

	let compareString;
	let lastCompareString;

	/**
	 * Autosave 'save' function that pulls content from Gutenberg state. Based on `wp.autosave.save`.
	 *
	 * @since 1.9.0
	 *
	 * @returns {Object|bool} postData The autosaved post data to send, or false if no autosave is needed.
	 */
	const save = function() {
		// Bail early if autosaving is suspended or saving is blocked.
		if ( wp.autosave.isSuspended || wp.autosave._blockSave ) {
			return false;
		}

		// Check if its time for another autosave.
		if ( ( new Date() ).getTime() < wp.autosave.nextRun ) {
			return false;
		}

		// Get the current editor state and compute the compare string (title::excerpt::content).
		const state = getState();
		compareString = getCompareString( state );

		// Initialize lastCompareString if this is the first run and it is undefined.
		if ( typeof lastCompareString === 'undefined' ) {
			lastCompareString = compareString;
		}

		// Bail if no changes to the compare string (title::excerpt::content).
		if ( compareString === lastCompareString ) {
			return false;
		}

		// Store the latest compare string.
		lastCompareString = compareString;

		// Block autosaving for 10 seconds.
		wp.autosave.server.tempBlockSave();

		const postData = getCurrentPost( state );

		// Dispath an event to set the state isAutosaving to true..
		dispatch( toggleAutosave( true ) );

		// Add some additional data point copies expected on the back end.
		postData.post_id = postData.id;
		postData.post_type = postData.type;

		// Save the data in local storage.
		storeLocal( postData );

		// Trigger some legacy events.
		$document.trigger( 'wpcountwords', [ postData.content ] )
			.trigger( 'before-autosave', [ postData ] );

		// Trigger a hook action.
		doAction( 'editor.beforeAutosave', postData );

		// Add the nonce to validate the request.
		postData._wpnonce = jQuery( '#_wpnonce' ).val() || '';

		return postData;
	};

	// Tie autosave button state triggers to Gutenberg autosave state.
	$document.on( 'autosave-enable-buttons', function() {
		dispatch( toggleAutosave( false ) );
	} );

	/**
	 * Disable the default (classic editor) autosave connection event handlers.
	 */
	$document.off( 'heartbeat-connection-lost.autosave' );
	$document.off( 'heartbeat-connection-restored.autosave' );
	$document.off( 'heartbeat-send.autosave' );

	/**
	 * Handle the heartbeat-send event, attaching autosave data if available.
	 */
	$document.on( 'heartbeat-send.autosave', function( event, data ) {
		const autosaveData = save();

		if ( autosaveData ) {
			data.wp_autosave = autosaveData;
		}
	} );

	/**
	 * Disable buttons and throw a notice when the connection is lost.
	 *
	 * @since 1.9.0
	 *
	 * @returns {void}
	 */
	$document.on( 'heartbeat-connection-lost.autosave', function( event, error, status ) {
		// When connection is lost, keep user from submitting changes.
		if ( 'timeout' === error || 'error' === error || 603 === status ) {
			dispatch( showDisconnectionNotice() );
			dispatch( toggleNetworkIsConnected( false ) );
		}
	} );

	/**
	 * Enable buttons when the connection is restored.
	 *
	 * @since 1.9.0
	 *
	 * @returns {void}
	 */
	$document.on( 'heartbeat-connection-restored.autosave', function() {
		dispatch( removeNotice( DISCONNECTION_NOTICE_ID ) );
		dispatch( toggleNetworkIsConnected( true ) );
	} );

	/**
	 * Sets (save or delete) post data in the storage.
	 *
	 * If stored_data evaluates to 'false' the storage key for the current post will be removed.
	 *
	 * @since 1.9.0
	 *
	 * @param {Object|boolean|null} postData The post data to store or null/false/empty to delete the key.
	 *
	 * @returns {boolean} True if data is stored, false if data was removed.
	 */
	function setData( postData ) {
		const stored = getStorage();
		const postId = postData.id;

		if ( ! stored || ! postId ) {
			return false;
		}

		if ( postData ) {
			stored[ 'post_' + postId ] = postData;
		} else if ( stored.hasOwnProperty( 'post_' + postId ) ) {
			delete stored[ 'post_' + postId ];
		} else {
			return false;
		}

		return setStorage( stored );
	}

	const blogId = typeof window.autosaveL10n !== 'undefined' && window.autosaveL10n.blog_id;

	/**
	 * Initializes post local storage.
	 *
	 * @since 1.9.0
	 *
	 * @returns {boolean|Object} False if no sessionStorage in the browser or an Object
	 *                           containing all postData for this blog.
	 */
	function getStorage() {
		let storedObject = false;

		// Separate local storage containers for each blog_id
		if ( wp.autosave.local.hasStorage && blogId ) {
			storedObject = window.sessionStorage.getItem( 'wp-autosave-' + blogId );

			if ( storedObject ) {
				storedObject = JSON.parse( storedObject );
			} else {
				storedObject = {};
			}
		}

		return storedObject;
	}

	/**
	 * Sets the storage for this blog. Confirms that the data was saved
	 * successfully.
	 *
	 * @since 1.9.0
	 *
	 * @param {Object} postData The post data to store.
	 *
	 * @returns {boolean} True if the data was saved successfully, false if it wasn't saved.
	 */
	function setStorage( postData ) {
		if ( wp.autosave.local.hasStorage && blogId ) {
			const key = 'wp-autosave-' + blogId;
			window.sessionStorage.setItem( key, JSON.stringify( postData ) );
			return window.sessionStorage.getItem( key ) !== null;
		}

		return false;
	}

	/**
	 * Store the editor contents in local storage, in case the user disconnects.
	 *
	 * @param {Object} postData The post data to store.
	 *
	 * @returns {boolean} True if the data was saved successfully, false if it wasn't saved.
	 */
	function storeLocal( postData ) {
		const secure = ( 'https:' === window.location.protocol );

		if ( ! wp.autosave.local.hasStorage ) {
			return false;
		}

		postData.save_time = ( new Date() ).getTime();
		window.wpCookies.set( 'wp-saving-post', postData.id + '-check', 24 * 60 * 60, false, false, secure );
		return setData( postData );
	}

	/**
	 * Gets the saved post data for the current post.
	 *
	 * @since 1.9.0
	 *
	 * @param {int} postId The post id.
	 *
	 * @returns {boolean|Object} False if no storage or no data or the postData as an Object.
	 */
	function getSavedPostData( postId ) {
		const stored = getStorage();

		if ( ! stored || ! postId ) {
			return false;
		}

		return stored[ 'post_' + postId ] || false;
	}

	/**
	 * Checks if the saved data for the current post (if any) is different than the
	 * loaded post data on the screen.
	 *
	 * Shows a standard message letting the user restore the post data if different.
	 *
	 * @since 1.9.0
	 *
	 * @returns {void}
	 */
	function checkPostLocalSaveisDifferent() {
		const cookie = window.wpCookies.get( 'wp-saving-post' ),
			postData = getSavedPostData();

		if ( cookie === postData.id + '-saved' ) {
			window.wpCookies.remove( 'wp-saving-post' );

			// The post was saved properly, remove old local storage data and bail.
			setData( false, postData.id );
			return;
		}

		if ( ! postData ) {
			return;
		}

		dispatch( showLocalSaveNotice( postData ) );
	}

	// Check  local storage for post content.
	checkPostLocalSaveisDifferent();
}
