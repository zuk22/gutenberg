/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import './style.scss';
import edit from './edit';

export const name = 'core/video';

export const settings = {
	title: __( 'Video' ),

	description: __( 'Embed an video file and a simple video player.' ),

	icon: 'format-video',

	category: 'common',

	attributes: {
		width: {
			type: 'number',
			source: 'attribute',
			selector: 'video',
			attribute: 'width',
		},
		height: {
			type: 'number',
			source: 'attribute',
			selector: 'video',
			attribute: 'height',
		},
		sources: {
			type: 'array',
			default: [],
			source: 'query',
			selector: 'source',
			query: {
				src: {
					source: 'attribute',
					attribute: 'src',
				},
				type: {
					source: 'attribute',
					attribute: 'type',
				},
			},
		},
		subtitles: {
			type: 'array',
			default: [],
			source: 'query',
			selector: 'track',
			query: {
				src: {
					source: 'attribute',
					attribute: 'src',
				},
				srclang: {
					source: 'attribute',
					attribute: 'srclang',
				},
				kind: {
					source: 'attribute',
					attribute: 'kind',
				},
				label: {
					source: 'attribute',
					attribute: 'label',
				},
			},
		},
		controls: {
			type: 'boolean',
			source: 'attribute',
			selector: 'video',
			attribute: 'controls',
			default: true,
		},
		loop: {
			type: 'boolean',
			source: 'attribute',
			selector: 'video',
			attribute: 'loop',
		},
		poster: {
			type: 'string',
			source: 'attribute',
			selector: 'video',
			attribute: 'poster',
			default: '',
		},
		autoplay: {
			type: 'boolean',
			source: 'attribute',
			selector: 'video',
			attribute: 'autoplay',
		},
		muted: {
			type: 'boolean',
			source: 'attribute',
			selector: 'video',
			attribute: 'muted',
		},
		preload: {
			type: 'string',
			source: 'attribute',
			selector: 'video',
			attribute: 'preload',
		},
		caption: {
			type: 'array',
			source: 'children',
			selector: 'figcaption',
		},
	},

	supports: {
		align: true,
	},

	edit,

	save( { attributes } ) {
		const { autoplay, caption, controls, loop, muted, poster, preload, sources, subtitles } = attributes;
		return (

			<figure>
				{ !! sources.length &&
				<video
					autoPlay={ autoplay }
					controls={ controls }
					loop={ loop }
					muted={ muted }
					preload={ preload }
					poster={ poster }
				>
					{ sources.map( ( source ) => {
						return (
							<source
								key={ source.src }
								src={ source.src }
								type={ source.type }
							/>
						);
					} ) }
					{ subtitles.map( ( subtitle ) => {
						return (
							<track
								key={ subtitle.src }
								srcLang={ subtitle.srclang }
								label={ subtitle.label }
								kind={ subtitle.kind }
								src={ subtitle.src }
							/>
						);
					} ) }
				</video>
				}
				{ caption && caption.length > 0 && <RichText.Content tagName="figcaption" value={ caption } /> }
			</figure>
		);
	},
};
