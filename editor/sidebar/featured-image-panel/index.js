/**
 * WordPress dependencies
 */
import { __ } from 'i18n';
import { PanelBody } from 'components';

/**
 * Internal dependencies
 */
import './style.scss';
import FeaturedImage from '../../featured-image';

function FeaturedImagePanel() {
	return (
		<PanelBody title={ __( 'Featured image' ) } initialOpen={ false }>
			<div className="editor-featured-image-panel__content">
				<FeaturedImage />
			</div>
		</PanelBody>
	);
}

export default FeaturedImagePanel;
