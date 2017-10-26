/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { registerBlockType, source, createBlock } from '../../api';
import CodeBlock from './block';

const { prop } = source;

registerBlockType( 'core/code', {
	title: __( 'Code' ),

	icon: 'editor-code',

	category: 'formatting',

	attributes: {
		content: {
			type: 'string',
			source: prop( 'code', 'textContent' ),
		},
	},

	supportHTML: false,

	transforms: {
		from: [
			{
				type: 'pattern',
				trigger: 'enter',
				regExp: /^```$/,
				transform: () => createBlock( 'core/code' ),
			},
			{
				type: 'raw',
				isMatch: ( node ) => (
					node.nodeName === 'PRE' &&
					node.children.length === 1 &&
					node.firstChild.nodeName === 'CODE'
				),
			},
		],
	},

	edit: CodeBlock,

	save( { attributes } ) {
		return <pre><code>{ attributes.content }</code></pre>;
	},
} );
