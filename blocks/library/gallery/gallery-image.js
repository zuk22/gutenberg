/**
 * External Depenedencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { IconButton, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function GalleryImage( {
	url,
	alt,
	id,
	linkTo,
	link,
	isSelected,
	onClick,
	onRemove,
} ) {
	let href;

	switch ( linkTo ) {
		case 'media':
			href = url;
			break;
		case 'attachment':
			href = link;
			break;
	}

	const img = url ? <img src={ url } alt={ alt } data-id={ id } /> : <Spinner />;

	const className = classnames( 'blocks-gallery-image', {
		'is-selected': isSelected,
	} );

	// Disable reason: Each block can be selected by clicking on it and we should keep the same saved markup
	/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
	return (
		<figure className={ className } onClick={ onClick }>
			{ isSelected &&
				<div className="blocks-gallery-image__inline-menu">
					<IconButton
						icon="no-alt"
						onClick={ onRemove }
						className="blocks-gallery-image__remove"
						label={ __( 'Remove Image' ) }
					/>
				</div>
			}
			{ href ? <a href={ href }>{ img }</a> : img }
		</figure>
	);
	/* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
}

export default GalleryImage;
