/**
 * WordPress dependencies
 */
import {
	registerBlockType,
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import * as paragraph from './paragraph';
import * as code from './code';
import * as more from './more';

export const registerCoreBlocks = () => {
	[
		// Common blocks are grouped at the top to prioritize their display
		// in various contexts — like the inserter and auto-complete components.
		paragraph,

		// Register all remaining core blocks.
		code,
		more,
	].forEach( ( { name, settings } ) => {
		registerBlockType( name, settings );
	} );
};
