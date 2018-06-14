import AddComment from './add-comment';

/* WordPress dependencies */
import { Component, compose } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';

class Commenting extends Component {
	render() {
		const { comments, isAddingComment, openAddComment, uid } = this.props;
		const hasComments = comments.length !== 0;

		const style = {
			position: 'absolute',
			right: '-400px',
			width: '400px',
			background: 'white',
			border: '1px solid black',
			padding: '20px',
		};

		const commentStyle = {
			marginBottom: '40px',
		};

		if ( ! isAddingComment && ! hasComments ) {
			return null;
		}

		return (
			<div style={ style }>
				{ comments.map( ( comment, i ) => {
					const isLastComment = ( i + 1 ) === comments.length;

					return <div key={ comment.content } style={ commentStyle }>
						<div className="author-thingy" style={ { lineHeight: '1.8em' } }>
							<img alt="" src="https://pbs.twimg.com/profile_images/604036009714675712/4yJxzyu2_400x400.png" width="50" height="50" style={ { marginRight: '10px', float: 'left' } } />
							{ comment.author }<br />
							{ comment.date }
							<div style={ { clear: 'both' } } />
						</div>
						{ comment.content }
						<br />
						{ isLastComment && (
							<button type="button" onClick={ openAddComment.bind( null, uid ) }>Reply -</button>
						) }
						<button type="button">Resolve</button>
						-
						<button type="button">Delete</button>
					</div>;
				} ) }
				{ isAddingComment && (
					<AddComment />
				) }
			</div>
		);
	}
}

export default compose( [
	withSelect( ( select, ownProps ) => {
		return {
			comments: select( 'core/editor' ).getCommentsForBlock( ownProps.uid ),
			isAddingComment: select( 'core/editor' ).isCommentingOnBlock( ownProps.uid ),
		};
	} ),
	withDispatch( ( dispatch ) => {
		return {
			openAddComment( commentingOn ) {
				dispatch( 'core/editor' ).showCommentingUI( commentingOn );
			},
		};
	} ),
] )( Commenting );

