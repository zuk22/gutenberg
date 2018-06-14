/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */


class Annotator extends Component {
	constructor() {
		super();

		this.state = {
			annotations: {

			},
		};
	}

	renderAnnotation( annotation ) {

	}

	render() {
		console.log( this.props.annotations );
		console.log( this.props.annotations.length + " annotations" );

		return <div>
			Hello!
		</div>;
	}
}

export default withSelect( ( select ) => {
	return {
		annotations: select( 'core/editor' ).getAnnotations(),
	};
} )( Annotator );
