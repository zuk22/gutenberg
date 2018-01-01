import store from '../store';
import {
	getCurrentPost,
} from '../store/selectors';

export function setupHearthbeat() {

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

	let _blockSave, _blockSaveTimer, previousCompareString, lastCompareString,
		nextRun = 0,
		isSuspended = false;


	/**
	 * @summary  Blocks saving for the next 10 seconds.
	 *
	 * @since 3.9.0
	 *
	 * @returns {void}
	 */
	function tempBlockSave() {
		_blockSave = true;
		window.clearTimeout( _blockSaveTimer );

		_blockSaveTimer = window.setTimeout( function() {
			_blockSave = false;
		}, 10000 );
	}

	/**
	 * @summary Sets isSuspended to true.
	 *
	 * @since 3.9.0
	 *
	 * @returns {void}
	 */
	function suspend() {
		isSuspended = true;
	}

	/**
	 * @summary Sets isSuspended to false.
	 *
	 * @since 3.9.0
	 *
	 * @returns {void}
	 */
	function resume() {
		isSuspended = false;
	}

	/**
	 * @summary Triggers the autosave with the post data.
	 *
	 * @since 3.9.0
	 *
	 * @param {Object} data The post data.
	 *
	 * @returns {void}
	 */
	function response( data ) {
		_schedule();
		_blockSave = false;
		lastCompareString = previousCompareString;
		previousCompareString = '';

		$document.trigger( 'after-autosave', [data] );
		enableButtons();

		if ( data.success ) {
			// No longer an auto-draft
			$( '#auto_draft' ).val('');
		}
	}

	/**
	 * @summary Saves immediately.
	 *
	 * Resets the timing and tells heartbeat to connect now.
	 *
	 * @since 3.9.0
	 *
	 * @returns {void}
	 */
	function triggerSave() {
		nextRun = 0;
		wp.heartbeat.connectNow();
	}

	/**
	 * @summary Checks if the post content in the textarea has changed since page load.
	 *
	 * This also happens when TinyMCE is active and editor.save() is triggered by
	 * wp.autosave.getPostData().
	 *
	 * @since 3.9.0
	 *
	 * @return {boolean} True if the post has been changed.
	 */
	function postChanged() {
		return getCompareString() !== initialCompareString;
	}

	const state       = store.getState();
	const postData    = getCurrentPost( state );
	let compareString = getCompareString( postData );

	// Set initial content.
	let initialCompareString = compareString;

	/**
	 * @summary Checks if the post can be saved or not.
	 *
	 * If the post hasn't changed or it cannot be updated,
	 * because the autosave is blocked or suspended, the function returns false.
	 *
	 * @since 3.9.0
	 *
	 * @returns {Object} Returns the post data.
	 */
	function save() {
		let postData, compareString;

		if ( isSuspended || _blockSave ) {
			return false;
		}

		if ( ( new Date() ).getTime() < nextRun ) {
			return false;
		}
		const state = store.getState();
		postData    = getCurrentPost( state );
		compareString = getCompareString( postData );

		// First check
		if ( typeof lastCompareString === 'undefined' ) {
			lastCompareString = initialCompareString;
		}

		// No change
		if ( compareString === lastCompareString ) {
			return false;
		}

		previousCompareString = compareString;
		tempBlockSave();
		disableButtons();

		$document.trigger( 'wpcountwords', [ postData.content ] )
			.trigger( 'before-autosave', [ postData ] );

		postData._wpnonce = $( '#_wpnonce' ).val() || '';

		postData.post_id = postData.id;

		return postData;
	}

	/**
	 * @summary Sets the next run, based on the autosave interval.
	 *
	 * @private
	 *
	 * @since 3.9.0
	 *
	 * @returns {void}
	 */
	function _schedule() {
		nextRun = ( new Date() ).getTime() + ( 30 * 1000 );
	}

	/**
	 * @summary Sets the autosaveData on the autosave heartbeat.
	 *
	 * @since 3.9.0
	 *
	 * @returns {void}
	 */
	$document.on( 'heartbeat-send.autosave', function( event, data ) {
		const autosaveData = save();
		console.log( 'heartbeat-send.autosave', state, autosaveData );

		if ( autosaveData ) {
			data.wp_autosave = autosaveData;
		}

	});


	/**
	 * @summary Triggers the autosave of the post with the autosave data
	 * on the autosave heartbeat.
	 *
	 * @since 3.9.0
	 *
	 * @returns {void}
	 */
	$document.on( 'heartbeat-tick.autosave', function( event, data ) {

		if ( data.wp_autosave ) {
			response( data.wp_autosave );
		}

	});

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

		/**
		 * @summary Enables buttons when the connection is restored.
		 *
		 * @since 3.9.0
		 *
		 * @returns {void}
		 */
	});
	$document.on( 'heartbeat-connection-restored.autosave', function() {
		// @todo hide connection notice
		// @todo enable publish/update buttons

	});

	$document.ready( function() {
		_schedule();
	});


	/**
	 * @summary Concatenates the title, content and excerpt.
	 *
	 * This is used to track changes when auto-saving.
	 *
	 * @since 3.9.0
	 *
	 * @param {Object} postData The object containing the post data.
	 *
	 * @returns {string} A concatenated string with title, content and excerpt.
	 */
	function getCompareString( postData ) {
		if ( typeof postData === 'object' ) {
			return ( postData.post_title || '' ) + '::' + ( postData.content || '' ) + '::' + ( postData.excerpt || '' );
		}

		return ( $('#title').val() || '' ) + '::' + ( $('#content').val() || '' ) + '::' + ( $('#excerpt').val() || '' );
	}

	/**
	 * @summary Disables save buttons.
	 *
	 * @since 3.9.0
	 *
	 * @returns {void}
	 */
	function disableButtons() {
		$document.trigger('autosave-disable-buttons');

		// Re-enable 5 sec later. Just gives autosave a head start to avoid collisions.
		setTimeout( enableButtons, 5000 );
	}

	/**
	 * @summary Enables save buttons.
	 *
	 * @since 3.9.0
	 *
	 * @returns {void}
	 */
	function enableButtons() {
		$document.trigger( 'autosave-enable-buttons' );
	}
}
