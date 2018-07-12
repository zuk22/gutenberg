/**
 * External Dependencies
 */
import { forOwn } from 'lodash';

/**
 * WordPress Dependencies
 */
import {
	defaultRegistry,
	withRehydration,
	loadAndPersist,
} from '@wordpress/data';

/**
 * Internal dependencies
 */
import reducer from './reducer';
import applyMiddlewares from './middlewares';
import * as selectors from './selectors';
import * as actions from './actions';
import * as tokens from '../components/rich-text/core-tokens';
import { validateTokenSettings } from '../components/rich-text/tokens';

/**
 * Module Constants
 */
const STORAGE_KEY = `GUTENBERG_PREFERENCES_${ window.userSettings.uid }`;
const MODULE_KEY = 'core/editor';

export function createStore( registry ) {
	const store = applyMiddlewares(
		registry.registerReducer( MODULE_KEY, withRehydration( reducer, 'preferences', STORAGE_KEY ) )
	);
	loadAndPersist( store, reducer, 'preferences', STORAGE_KEY );

	registry.registerSelectors( MODULE_KEY, selectors );
	registry.registerActions( MODULE_KEY, actions );

	forOwn( tokens, ( { name, settings } ) => {
		settings = validateTokenSettings( name, settings, store.getState() );

		if ( settings ) {
			store.dispatch( actions.registerToken( name, settings ) );
		}
	} );
}

export default createStore( defaultRegistry );
