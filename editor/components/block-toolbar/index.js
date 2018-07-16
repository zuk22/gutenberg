/**
 * WordPress Dependencies
 */
import { withSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import './style.scss';
import BlockSwitcher from '../block-switcher';
import BlockControls from '../block-controls';
import MultiBlockControls from '../block-controls/multi-block-controls';
import MultiBlocksSwitcher from '../block-switcher/multi-blocks-switcher';
import BlockFormatControls from '../block-format-controls';

function BlockToolbar( { blockClientIds, isValid, mode, isSelecting } ) {
	if ( blockClientIds.length > 1 && ! isSelecting ) {
		return (
			<div className="editor-block-toolbar">
				<MultiBlocksSwitcher />
				<MultiBlockControls.Slot />
			</div>
		);
	}
	if ( ! isValid || 'visual' !== mode ) {
		return null;
	}

	return (
		<div className="editor-block-toolbar">
			<BlockSwitcher clientIds={ blockClientIds } />
			<MultiBlockControls.Slot />
			<BlockControls.Slot />
			<BlockFormatControls.Slot />
		</div>
	);
}

export default withSelect( ( select ) => {
	const {
		getSelectedBlock,
		getBlockMode,
		getMultiSelectedBlockClientIds,
		isMultiSelecting,
	} = select( 'core/editor' );
	const block = getSelectedBlock();
	const blockClientIds = block ?
		[ block.clientId ] :
		getMultiSelectedBlockClientIds();

	return {
		blockClientIds,
		isValid: block ? block.isValid : null,
		mode: block ? getBlockMode( block.clientId ) : null,
		isSelecting: isMultiSelecting(),
	};
} )( BlockToolbar );
