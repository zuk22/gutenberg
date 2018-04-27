import { View, Text } from 'react-native';

/**
 * WordPress dependencies
 */
// import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './editor.scss';
// import RichText from '../../rich-text';
// import BlockControls from '../../block-controls';

export const name = 'core/heading';

export function edit( { attributes, setAttributes, isSelected, mergeBlocks, insertBlocksAfter, onReplace, className } ) {
	const { align, content, nodeName, placeholder } = attributes;

	return <View><Text>hello</Text></View>;
	// [
		// isSelected && (
		// 	<BlockControls
		// 		key="controls"
		// 		controls={
		// 			'234'.split( '' ).map( ( level ) => ( {
		// 				icon: 'heading',
		// 				title: sprintf( __( 'Heading %s' ), level ),
		// 				isActive: 'H' + level === nodeName,
		// 				onClick: () => setAttributes( { nodeName: 'H' + level } ),
		// 				subscript: level,
		// 			} ) )
		// 		}
		// 	/>
		// ),
		// <RichText
		// 	key="editable"
		// 	value={ content }
		// 	isSelected={ isSelected }
		// />,
		// <View><Text>hello</Text></View>;
	// ];
}
