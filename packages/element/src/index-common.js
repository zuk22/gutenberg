/**
 * External dependencies
 */
import {
	createElement,
	Component,
} from 'react';
import {
	camelCase,
	upperFirst,
} from 'lodash';

/**
 * WordPress dependencies
 */
import isShallowEqual from '@wordpress/is-shallow-equal';

/**
 * Given a function mapping a component to an enhanced component and modifier
 * name, returns the enhanced component augmented with a generated displayName.
 *
 * @param {Function} mapComponentToEnhancedComponent Function mapping component
 *                                                   to enhanced component.
 * @param {string}   modifierName                    Seed name from which to
 *                                                   generated display name.
 *
 * @return {WPComponent} Component class with generated display name assigned.
 */
export function createHigherOrderComponent( mapComponentToEnhancedComponent, modifierName ) {
	return ( OriginalComponent ) => {
		const EnhancedComponent = mapComponentToEnhancedComponent( OriginalComponent );
		const { displayName = OriginalComponent.name || 'Component' } = OriginalComponent;
		EnhancedComponent.displayName = `${ upperFirst( camelCase( modifierName ) ) }(${ displayName })`;

		return EnhancedComponent;
	};
}

/**
 * Component used as equivalent of Fragment with unescaped HTML, in cases where
 * it is desirable to render dangerous HTML without needing a wrapper element.
 * To preserve additional props, a `div` wrapper _will_ be created if any props
 * aside from `children` are passed.
 *
 * @param {string} props.children HTML to render.
 *
 * @return {WPElement} Dangerously-rendering element.
 */
export function RawHTML( { children, ...props } ) {
	// The DIV wrapper will be stripped by serializer, unless there are
	// non-children props present.
	return createElement( 'div', {
		dangerouslySetInnerHTML: { __html: children },
		...props,
	} );
}

// /**
//  * Given a component returns the enhanced component augmented with a component
//  * only rerendering when its props/state change
//  *
//  * @param {Function} mapComponentToEnhancedComponent Function mapping component
//  *                                                   to enhanced component.
//  * @param {string}   modifierName                    Seed name from which to
//  *                                                   generated display name.
//  *
//  * @return {WPComponent} Component class with generated display name assigned.
//  */
// export const pure = createHigherOrderComponent( ( Wrapped ) => {
// 	if ( Wrapped.prototype instanceof Component ) {
// 		return class extends Wrapped {
// 			shouldComponentUpdate( nextProps, nextState ) {
// 				return ! isShallowEqual( nextProps, this.props ) || ! isShallowEqual( nextState, this.state );
// 			}
// 		};
// 	}

// 	return class extends Component {
// 		shouldComponentUpdate( nextProps ) {
// 			return ! isShallowEqual( nextProps, this.props );
// 		}

// 		render() {
// 			return <Wrapped { ...this.props } />;
// 		}
// 	};
// }, 'pure' );
