/**
 * Internal dependencies
 */
import './editor.scss';
import RichText from '../../rich-text';

export const name = 'core/heading';

export function edit( { attributes, setAttributes, isSelected, mergeBlocks, insertBlocksAfter, onReplace, className } ) {
	const { align, content, nodeName, placeholder } = attributes;

	return ( <RichText
		value={ content }
		isSelected={ isSelected }
	/> );
}
