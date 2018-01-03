import store from '../store';
import {
	getCurrentPost,
	getEditedPostTitle,
	getEditedPostExcerpt,
	getEditedPostContent,
} from '../store/selectors';
import {
	toggleAutosave,
} from '../store/actions'

export function setupHeartbeat() {
	const $document = jQuery( document );
	/**
	 * Configure heartbeat to refresh the wp-api nonce, keeping the editor authorization intact.
	 */
	$document.on( 'heartbeat-tick', ( event, response ) => {
		if ( response[ 'rest-nonce' ] ) {
			window.wpApiSettings.nonce = response[ 'rest-nonce' ];
		}
	} );

	/**
	 * Configure Heartbeat post locks.
	 *
	 * Used to lock editing of an object by only one user at a time.
	 *
	 * When the user does not send a heartbeat in a heartbeat-time
	 * the user is no longer editing and another user can start editing.
	 */
	$document.on( 'heartbeat-send.refresh-lock', function( e, data ) {
		const lock = jQuery( '#active_post_lock' ).val(),
			postId = jQuery( '#post_ID' ).val(),
			send = {};

		if ( ! postId ) {
			return;
		}
		send.post_id = postId;

		if ( lock ) {
			send.lock = lock;
		}

		data[ 'wp-refresh-post-lock' ] = send;
	} );

	// Refresh post locks: update the lock string or show the dialog if somebody has taken over editing.
	$document.on( 'heartbeat-tick.refresh-lock', function( e, data ) {
		if ( data[ 'wp-refresh-post-lock' ] ) {
			const received = data[ 'wp-refresh-post-lock' ];

			if ( received.lock_error ) {
				// @todo suspend autosaving
				// @todo Show "editing taken over" message.
			} else if ( received.new_lock ) {
				jQuery( '#active_post_lock' ).val( received.new_lock );
			}
		}
	} );

	/**
	 * @summary Concatenates the title, content and excerpt.
	 *
	 * This is used to track changes when auto-saving.
	 *
	 * @since 3.9.0
	 *
	 * @param {Object} state The current state.
	 *
	 * @returns {string} A concatenated string with title, content and excerpt.
	 */
	const getCompareString = function ( state ) {
		return ( getEditedPostTitle( state ) || '' ) + '::' + ( getEditedPostContent( state ) || '' ) + '::' + ( getEditedPostExcerpt( state ) || '' );
	}

	/**
	 * Autosaves.
	 */
	const { dispatch, getState } = store;

	let compareString;
	let lastCompareString;

	// Overwrite the core autosave 'save' function with one that pulls content from Gutenberg state.
	const save = function() {
		if ( wp.autosave.isSuspended || wp.autosave._blockSave ) {
			return false;
		}

		if ( ( new Date() ).getTime() < wp.autosave.nextRun ) {
			return false;
		}
		const state = getState();
		compareString = getCompareString( state );

		// First check
		if ( typeof lastCompareString === 'undefined' ) {
			lastCompareString = getCompareString( state );
		}

		// No change
		if ( compareString === lastCompareString ) {
			return false;
		}
		lastCompareString = compareString;

		wp.autosave.previousCompareString = compareString;
		wp.autosave.server.tempBlockSave();

		const postData = getCurrentPost( state );

		// Show progress and disable update buttons.
		dispatch( toggleAutosave( true ) );

		$document.trigger( 'wpcountwords', [ postData.content ] )
			.trigger( 'before-autosave', [ postData ] );

		postData._wpnonce = jQuery( '#_wpnonce' ).val() || '';

		postData.post_id   = postData.id;
		postData.post_type = postData.type;

		return postData;
	};


	// Tie autosave button state triggers to Gutenberg autosave state.
	$document.on( 'autosave-enable-buttons', function() {
		dispatch( toggleAutosave( false ) );
	} );

	/**
	 * Disable the default autosave connection event handlers.
	 */
	$document.off( 'heartbeat-connection-lost.autosave' );
	$document.off( 'heartbeat-connection-restored.autosave' );
	$document.off( 'heartbeat-send.autosave' );
	$document.on( 'heartbeat-send.autosave', function( event, data ) {
		const autosaveData = save();

		if ( autosaveData ) {
			data.wp_autosave = autosaveData;
		}
	} );
	/**
	 * @summary Disables buttons and throws a notice when the connection is lost.
	 *
	 * @since 3.9.0
	 *
	 * @returns {void}
	 */
	$document.on( 'heartbeat-connection-lost.autosave', function( event, error, status ) {
		// When connection is lost, keep user from submitting changes.
		if ( 'timeout' === error || 603 === status ) {
			if ( wp.autosave.local.hasStorage ) {
				// @todo use sessionstorage for autosaves
			}
			// @todo show the disconnections notice
			// @todo disable publish/update buttons.
		}
	} );

	/**
	 * @summary Enables buttons when the connection is restored.
	 *
	 * @since 3.9.0
	 *
	 * @returns {void}
	 */
	$document.on( 'heartbeat-connection-restored.autosave', function() {
		// @todo hide connection notice
	// @todo enable publish/update buttons
	} );
}
