/**
 * WordPress dependencies
 */
import {
	registerBlockType,
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import * as heading from './heading';
import * as code from './code';
import * as more from './more';

export const registerCoreBlocks = () => {
	[
		heading,
		code,
		more,
	].forEach( ( { name, settings } ) => {
		registerBlockType( name, settings );
	} );
};
