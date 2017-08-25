/**
 * External dependencies
 */
import { reduce, map } from 'lodash';

/**
 * WordPress dependencies
 */
import { createElement } from '@wordpress/element';

export function namedNodeMapToObject( namedNodeMap ) {
	return reduce( namedNodeMap, ( result, entry ) => {
		result[ entry.name ] = entry.value;
		return result;
	}, {} );
}

export function toText( node ) {
	return {
		type: 'text',
		text: node.nodeValue,
	};
}

export function toNode( node ) {
	const { nodeName, attributes, childNodes } = node;

	return {
		type: 'node',
		name: nodeName.toLowerCase(),
		attributes: namedNodeMapToObject( attributes ),
		children: children( childNodes ),
	};
}

export function children( childNodes ) {
	return reduce( childNodes, ( result, childNode ) => {
		switch ( childNode.nodeType ) {
			case window.Node.ELEMENT_NODE:
				result.push( toNode( childNode ) );
				break;

			case window.Node.TEXT_NODE:
				result.push( toText( childNode ) );
				break;
		}

		return result;
	}, [] );
}

export function toElement( value ) {
	if ( value === null || value === undefined ) {
		return;
	}

	if ( Array.isArray( value ) ) {
		return map( toElement, value );
	}

	switch ( value.type ) {
		case 'text':
			return value.text;

		case 'element':
			return createElement(
				value.name,
				value.attributes,
				toElement( value.children ),
			);
	}
}
