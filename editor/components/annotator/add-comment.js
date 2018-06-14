/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { withDispatch } from '@wordpress/data';

class AddComment extends Component {
	constructor() {
		super();

		this.state = {
			comment: '',
		};

		this.onType = this.onType.bind( this );
	}

	onType( changeEvent ) {
		this.setState( {
			comment: changeEvent.target.value,
		} );
	}

	render() {
		const { onCancel, onComment } = this.props;

		return <div>
			Anton Timmermans
			Enter your comment:
			<br />

			<input onChange={ this.onType } type="text" />

			<br />

			<button onClick={ onComment.bind( null, this.state.comment ) }>Comment</button>
			-
			<button onClick={ onCancel }>Cancel</button>
		</div>;
	}
}

export default withDispatch( ( dispatch ) => {
	return {
		onCancel() {
			dispatch( 'core/editor' ).cancelCommenting();
		},
		onComment( content ) {
			dispatch( 'core/editor' ).addComment( content );
		},
	};
} )( AddComment );
