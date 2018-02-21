// @flow
/**
 * Internal dependencies
 */
import './hooks';

export * from './components';

import { registerBlockType } from '@wordpress/blocks';

// This produces an error even if it's defined in another module
// because the first param is not a string.
registerBlockType( {}, 'error' );
