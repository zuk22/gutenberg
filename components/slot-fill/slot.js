/**
 * External dependencies
 */
import { noop, map, isString, isFunction } from 'lodash';

/**
 * WordPress dependencies
 */
import {
	Component,
	Children,
	Fragment,
	cloneElement,
	createRef,
} from '@wordpress/element';

class Slot extends Component {
	constructor() {
		super( ...arguments );

		this.placeholderRef = createRef();
	}

	componentDidMount() {
		const { registerSlot = noop } = this.context;

		if ( this.props.bubblesVirtually ) {
			this.node = this.placeholderRef.current.parentNode;

			// Trigger another render, which will cause the temporary div to be
			// removed now that `this.node` is assigned.
			this.forceUpdate();
		}

		registerSlot( this.props.name, this );
	}

	componentWillUnmount() {
		const { unregisterSlot = noop } = this.context;

		unregisterSlot( this.props.name, this );
	}

	componentWillReceiveProps( nextProps ) {
		const { name } = nextProps;
		const {
			unregisterSlot = noop,
			registerSlot = noop,
		} = this.context;

		if ( this.props.name !== name ) {
			unregisterSlot( this.props.name );
			registerSlot( name, this );
		}
	}

	render() {
		const { children, name, bubblesVirtually, fillProps = {} } = this.props;
		const { getFills = noop } = this.context;

		if ( bubblesVirtually ) {
			// For virtual event bubbling, the Fill needs a DOM node to use as
			// target for createPortal. The behavior of portals is such that if
			// there is existing children, it is not overridden, and any later
			// unmounts are managed automatically. Thus, it is reasonable to
			// use the node parent from which the Slot is rendered, which can
			// be determined by rendering a placeholder node, with ref, and
			// accessing the node's parent on mount.
			if ( this.node ) {
				return null;
			}

			return <div ref={ this.placeholderRef } />;
		}

		const fills = map( getFills( name ), ( fill ) => {
			const fillKey = fill.occurrence;

			// If a function is passed as a child, render it with the fillProps.
			if ( isFunction( fill.props.children ) ) {
				return cloneElement( fill.props.children( fillProps ), { key: fillKey } );
			}

			return Children.map( fill.props.children, ( child, childIndex ) => {
				if ( ! child || isString( child ) ) {
					return child;
				}

				const childKey = `${ fillKey }---${ child.key || childIndex }`;
				return cloneElement( child, { key: childKey } );
			} );
		} );

		return (
			<Fragment>
				{ isFunction( children ) ? children( fills.filter( Boolean ) ) : fills }
			</Fragment>
		);
	}
}

Slot.contextTypes = {
	registerSlot: noop,
	unregisterSlot: noop,
	getFills: noop,
};

export default Slot;
