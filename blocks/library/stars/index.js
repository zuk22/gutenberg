/**
 * External dependencies
 */
import { registerBlockType } from '../../api';

/**
 * External dependencies
 */
import { fromVueComponent } from '@wordpress/components';

registerBlockType( 'stars-block/stars', {
	title: 'Stars',

	icon: 'star-filled',

	category: 'layout',

	attributes: {
		stars: {
			type: 'number',
			default: 1,
		},
	},

	edit: fromVueComponent( {
		template: `
			<div>
				<span v-for="n in 5">
					<span
						@click="setAttributes( { stars: n } )"
						:class="[
							'dashicons',
							n > attributes.stars ? 'dashicons-star-empty' : 'dashicons-star-filled'
						]"
					/>
				</span>
			</div>
		`,
	} ),

	save: function() {},
} );
