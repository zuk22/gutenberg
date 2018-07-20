/**
 * External dependencies
 */
import classnames from 'classnames';
//import { isFinite, find, omit } from 'lodash';

import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { 
	Component, 
	concatChildren,
	renderToString, 
	compose 
} from '@wordpress/element';
import RCTAztecView from 'react-native-aztec';
import { 
	parse, 
	getPhrasingContentSchema 
} from '@wordpress/blocks';
import {
	withFallbackStyles,
} from '@wordpress/components';

import { RichText, 	withColors, getColorClass } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import './style.scss';

//const { getComputedStyle } = window;

const FallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textColor, backgroundColor, fontSize, customFontSize } = ownProps.attributes;
/*	const editableNode = node.querySelector( '[contenteditable="true"]' );
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;*/
	//console.log(ownProps.attributes);
	const computedStyles = null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackFontSize: fontSize || customFontSize || ! computedStyles ? undefined : parseInt( computedStyles.fontSize ) || undefined,
	};
} );

//console.log(FallbackStyles);


export const name = 'core/paragraph';

const schema = {
	content: {
		type: 'array',
		source: 'children',
		selector: 'p',
		default: [],
	},
	align: {
		type: 'string',
	},
	dropCap: {
		type: 'boolean',
		default: false,
	},
	placeholder: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
	backgroundColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	fontSize: {
		type: 'string',
	},
	customFontSize: {
		type: 'number',
	},
};

const supports = {
	className: false,
};

const _minHeight = 50;

class ParagraphBlock extends Component {
	constructor() {
		super( ...arguments );
		//console.log('ParagraphBlock->constructor');
		//console.log(...arguments)
	}
	render() {
		const {
			attributes,
			setAttributes,
			mergeBlocks,
			onReplace,
			className,
			backgroundColor,
			textColor,
			setBackgroundColor,
			setTextColor,
			fallbackBackgroundColor,
			fallbackTextColor,
			fallbackFontSize,
			style,
		} = this.props;
		return (
			<View>
				<RichText
					content={ { contentTree: attributes.content, eventCount: attributes.eventCount } }
					style={ style, [ 
						{ minHeight: Math.max( _minHeight,  attributes.aztecHeight != null ? attributes.aztecHeight : 0) },
					] }
					onChange={ ( event ) => {
						//console.log(event);
						setAttributes({
							...this.props.attributes,
							content: event.content,
							eventCount: event.eventCount,
							});
						}
					}
					onContentSizeChange= { ( event ) => {
						setAttributes({
							...this.props.attributes,
							aztecHeight: event.aztecHeight,
							}); 
						}
					}
					placeholder={ __( 'Write Write!!' ) }
					aria-label={ __( 'test' ) }
				/>
			</View>
		);
	}
}

export const settings = {

	title: __( 'Paragraph' ),

	description: __( 'This is a simple text only block for adding a single paragraph of content.' ),

	icon: 'editor-paragraph',

	category: 'common',

	keywords: [ __( 'text' ) ],

	supports,

	attributes: schema,

	transforms: {
		from: [
			{
				type: 'raw',
				// Paragraph is a fallback and should be matched last.
				priority: 20,
				selector: 'p',
				schema: {
					p: {
						children: getPhrasingContentSchema(),
					},
				},
			},
		],
	},

	edit: ParagraphBlock, /*compose( [
		//withColors( 'backgroundColor', { textColor: 'color' } ),
		FallbackStyles,
	] )( ParagraphBlock ),*/

	save( { attributes } ) {
		const {
			align,
			content,
			dropCap,
			backgroundColor,
			textColor,
			customBackgroundColor,
			customTextColor,
			fontSize,
			customFontSize,
		} = attributes;

		const textClass = getColorClass( 'color', textColor );
		const backgroundClass = getColorClass( 'background-color', backgroundColor );
		const fontSizeClass = fontSize && `is-${ fontSize }-text`;

		const className = classnames( {
			'has-background': backgroundColor || customBackgroundColor,
			'has-drop-cap': dropCap,
			[ fontSizeClass ]: fontSizeClass,
			[ textClass ]: textClass,
			[ backgroundClass ]: backgroundClass,
		} );

		// Not used yet
		const styles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			color: textClass ? undefined : customTextColor,
			fontSize: fontSizeClass ? undefined : customFontSize,
			textAlign: align,
		};

		return <p>{attributes.content}</p>;
		/*return (
			<RichText.Content
				tagName="p"
				//style={ styles }
				//className={ className ? className : undefined }
				value={ content }
			/>
		);*/
	},
};