/**
 * WordPress dependencies
 */
import {
	RichText,
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './editor.scss';

export const name = 'core/heading';

export function edit( { attributes, setAttributes, isSelected, mergeBlocks, insertBlocksAfter, onReplace, className } ) {
	const { content } = attributes;

	return [
		<RichText
			key="editable"
			value={ content }
			onChange={ setAttributes }
			isSelected={ isSelected }
		/>,
	];
}
