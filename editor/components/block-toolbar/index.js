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

function BlockToolbar( { blockUIDs, isValid, mode, isSelecting } ) {
	if ( blockUIDs.length > 1 && ! isSelecting ) {
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
			<BlockSwitcher uids={ blockUIDs } />
			<MultiBlockControls.Slot />
			<BlockControls.Slot />
			<BlockFormatControls.Slot />
		</div>
	);
}

export default withSelect( ( select ) => {
	const { getSelectedBlock, getBlockMode, getMultiSelectedBlockUids, isMultiSelecting } = select( 'core/editor' );
	const block = getSelectedBlock();
	const blockUIDs = block ? [ block.uid ] : getMultiSelectedBlockUids();

	return {
		blockUIDs,
		isValid: block ? block.isValid : null,
		mode: block ? getBlockMode( block.uid ) : null,
		isSelecting: isMultiSelecting(),
	};
} )( BlockToolbar );
