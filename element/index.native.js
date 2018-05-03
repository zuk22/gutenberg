/**
 * External dependencies
 */
import {
	createContext,
	createElement,
	Component,
	Children,
	Fragment,
} from 'react';

/**
 * Internal dependencies
 */
import serialize from './serialize';

/**
 * Returns a new element of given type. Type can be either a string tag name or
 * another function which itself returns an element.
 *
 * @param {?(string|Function)} type     Tag name or element creator
 * @param {Object}             props    Element properties, either attribute
 *                                       set to apply to DOM node or values to
 *                                       pass through to element creator
 * @param {...WPElement}       children Descendant elements
 *
 * @return {WPElement} Element.
 */
export { createElement };

/**
 * A base class to create WordPress Components (Refs, state and lifecycle hooks)
 */
export { Component };

export { Children };

/**
 * A component which renders its children without any wrapping element.
 */
export { Fragment };

/**
 * Creates a context object containing two components: a provider and consumer.
 *
 * @param {Object} defaultValue Data stored in the context.
 *
 * @return {Object} Context object.
 */
export { createContext };

/**
 * Renders a given element into a string.
 *
 * @param {WPElement} element Element to render
 *
 * @return {string} HTML.
 */
export { serialize as renderToString };
