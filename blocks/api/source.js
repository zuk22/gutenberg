/**
 * External dependencies
 */
import { flow } from 'lodash';
import {
	attr as originalAttr,
	prop as originalProp,
	html as originalHtml,
	text as originalText,
	query as originalQuery,
} from 'hpq';

/**
 * Internal dependencies
 */
import * as nodes from './nodes';

function applySelector( selector ) {
	return ( element ) => {
		if ( selector ) {
			return element.querySelector( selector );
		}

		return element;
	};
}

function applyKnownSourceFlag( source ) {
	source._wpBlocksKnownSource = true;
	return source;
}

/**
 * Given a source function creator, returns a new function which applies an
 * internal flag to the created source.
 *
 * @param  {Function} fn Original source function creator
 * @return {Function}    Modified source function creator
 */
function withKnownSourceFlag( fn ) {
	return flow( fn, applyKnownSourceFlag );
}

export const attr = withKnownSourceFlag( originalAttr );
export const prop = withKnownSourceFlag( originalProp );
export const html = withKnownSourceFlag( originalHtml );
export const text = withKnownSourceFlag( originalText );
export const query = withKnownSourceFlag( originalQuery );
export const children = ( selector ) => flow(
	applySelector( selector ),
	( match ) => match.childNodes,
	nodes.children,
	applyKnownSourceFlag
);
export const node = ( selector ) => flow(
	applySelector( selector ),
	nodes.toNode,
	applyKnownSourceFlag
);
