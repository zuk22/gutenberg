/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { editPost, savePost } from '../../store/actions';
import {
	isSavingPost,
	isCurrentPostPublished,
	isNetworkConnected,
} from '../../store/selectors';

function PostSwitchToDraftButton( { className, isSaving, isPublished, onClick, isConnected } ) {
	if ( ! isPublished ) {
		return null;
	}

	return (
		<Button
			className={ className }
			isLarge
			onClick={ onClick }
			disabled={ isSaving || ! isConnected }
		>
			{ __( 'Switch to Draft' ) }
		</Button>
	);
}

const applyConnect = connect(
	( state ) => ( {
		isSaving: isSavingPost( state ),
		isPublished: isCurrentPostPublished( state ),
		isConnected: isNetworkConnected( state ),
	} ),
	{
		onClick: () => [
			editPost( { status: 'draft' } ),
			savePost(),
		],
	}
);

export default applyConnect( PostSwitchToDraftButton );
