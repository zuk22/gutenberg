/**
 * External dependencies
 */
import { cloneDeep, isFunction, partition, toPairs, fromPairs } from 'lodash';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

export default function fromVueComponent( options ) {
	return class extends Component {
		componentDidMount() {
			this.mount();
		}

		componentDidUpdate() {
			this.setDataProps();
		}

		mount() {
			const { methods, data } = this.getPartitionedProps();

			options = {
				...options,
				mixins: [
					...( options.mixins || [] ),

					// Pass props as mixin to the original component options
					{
						// Ensure data is passed as a cloned copy to prevent
						// reactivity applying to the original reference
						data: cloneDeep.bind( null, data ),
						methods,
					},
				],
			};

			// Mount instance into rendered DOM node
			// TODO: Resolve issues with Vue defined as Webpack externals
			this.vueInstance = new window.Vue( options ).$mount( this.node );
		}

		setDataProps() {
			const { data } = this.getPartitionedProps();

			// Vue instance will handle reactivity on assigned properties from
			// the updated prop values.
			Object.assign( this.vueInstance, data );
		}

		getPartitionedProps() {
			// Split methods from data inferred by prop value as function
			const [ methods, data ] = partition(
				toPairs( this.props ),
				( [ , value ] ) => isFunction( value )
			).map( fromPairs );

			return { methods, data };
		}

		render() {
			return <div ref={ ( node ) => this.node = node } />;
		}
	};
}
