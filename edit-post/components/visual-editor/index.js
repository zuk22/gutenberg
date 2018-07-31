/**
 * WordPress dependencies
 */
import {
	BlockList,
	CopyHandler,
	PostTitle,
	WritingFlow,
	ObserveTyping,
	EditorGlobalKeyboardShortcuts,
	KeyboardShortcutHelpModal,
	BlockSelectionClearer,
	MultiSelectScrollIntoView,
	_BlockSettingsMenuFirstItem,
} from '@wordpress/editor';

/**
 * Internal dependencies
 */
import './style.scss';
import BlockInspectorButton from './block-inspector-button';

function VisualEditor() {
	return (
		<BlockSelectionClearer className="edit-post-visual-editor">
			<EditorGlobalKeyboardShortcuts />
			<KeyboardShortcutHelpModal />
			<CopyHandler />
			<MultiSelectScrollIntoView />
			<WritingFlow>
				<ObserveTyping>
					<PostTitle />
					<BlockList />
				</ObserveTyping>
			</WritingFlow>
			<_BlockSettingsMenuFirstItem>
				{ ( { onClose } ) => <BlockInspectorButton onClick={ onClose } role="menuitem" /> }
			</_BlockSettingsMenuFirstItem>
		</BlockSelectionClearer>
	);
}

export default VisualEditor;
