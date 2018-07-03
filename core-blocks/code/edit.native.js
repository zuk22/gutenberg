import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PlainText } from '@wordpress/editor';

import RCTAztecView from 'react-native-aztec';

// Note: styling is applied directly to the (nested) PlainText component. Web-side components
// apply it to the container 'div' but we don't have a proper proposal for cascading styling yet.
export default function CodeEdit( { attributes, setAttributes, style } ) {
	return (

		<View>
			{/* <PlainText
				value={ attributes.content }
				style={ style }
				multiline={ true }
				underlineColorAndroid="transparent"
				onChange={ ( content ) => setAttributes( { content } ) }
				placeholder={ __( 'Write code…' ) }
				aria-label={ __( 'Code' ) }
			/> */}

				<RCTAztecView
					accessibilityLabel="aztec-view"
					style={ style }
					minHeight={50}
					text={ { text: attributes.content, eventCount: attributes.eventCount } }
					//text={attributes.content}
					onChange={ ( content ) => setAttributes( { content } ) }
					color={ 'black' }
					maxImagesWidth={ 200 }
				/>

		</View>
	);
}

