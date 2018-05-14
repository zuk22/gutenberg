import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import {
	RichText,
} from '@wordpress/editor';

export default function edit( { attributes, setAttributes, isSelected, mergeBlocks, insertBlocksAfter, onReplace, className } ) {
	const { content } = attributes;

	return (
		<View>
			<RichText
				key="editable"
				value={ content }
				onChange={ setAttributes }
				isSelected={ isSelected }
			/>
		</View>
	);
}
