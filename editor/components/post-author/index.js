/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	withInstanceId,
	Autocomplete,
} from '@wordpress/components';
import { Component, compose } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import PostAuthorCheck from './check';
import { getEditedPostAttribute } from '../../store/selectors';
import { editPost } from '../../store/actions';
import './style.scss';
import { authorAutocompleter } from '../../../blocks/autocompleters';
import RichText from '../../../blocks/rich-text';

export class PostAuthor extends Component {
	constructor() {
		super( ...arguments );
		this.fetchAuthors = throttle( this.fetchAuthors.bind( this ), 300 );
		this.setAuthorId = this.setAuthorId.bind( this );
		this.state = {
			searchusers: [],
		};
	}

	// When an author is selected, set the post author.
	setAuthorId( value ) {
		if ( ! value ) {
			return;
		}
		const { onUpdateAuthor } = this.props;
		onUpdateAuthor( Number( value.id ) );

		const allUsers = union( searchusers, users.data );

		// If the postAuthor user isn't found in the default ids, load it.
		if ( ! hasSearchResults && ! find( allUsers, { id: postAuthor } ) ) {
			const request = wp.apiRequest( { path: '/wp/v2/users/' + postAuthor + '?context=edit' } );
			request.then( ( response ) => {
				this.setState( { searchusers: [ response ] } );
			} );
		} else {
			return allUsers;
		}
	}

	/**
	 * Fetch authors from the REST API.
	 * @param  {string} query The search query.
	 * @return {Array}        The user fetch results.
	 */
	fetchAuthors( query ) {
		// If the query is blank, return the default user list.
		if ( ! query ) {
			return;
		}
		const request = wp.apiRequest( { path: '/wp/v2/users?context=edit&_fields=name,id&search=' + encodeURIComponent( query ) } );

		// Return a promise that resolves with the user search results.
		return request.then( ( response ) => {
			this.setState( { searchusers: response } );
			return { options: response };
		} );
	}

	onFocus() {
		this.value = '';
	}

	render() {
		const { postAuthor, instanceId, authors } = this.props;
		const selectId = 'post-author-selector-' + instanceId;
		const className = 'post-author-selector';

		/* eslint-disable jsx-a11y/no-onchange */
		return (
			<PostAuthorCheck>
				<label htmlFor={ selectId }>{ __( 'Author' ) }</label>
				<Autocomplete completers={ [
					authorAutocompleter(),
				] }>
					{ ( { isExpanded, listBoxId, activeId } ) => (
						<RichText
							tagName="p"
							className={ classnames( 'wp-block-paragraph', className, {
							} ) }
					value={ postAuthor }
							aria-autocomplete="list"
							aria-expanded={ true }
							aria-owns={ selectId }
							placeholder={ __( 'Search for author...' ) }
							onFocus={ onFocus }
				/>
					) }
				</Autocomplete>
			</PostAuthorCheck>
		);
		/* eslint-enable jsx-a11y/no-onchange */
	}
}

export default compose( [
	withSelect( ( select ) => {
		return {
			postAuthor: select( 'core/editor' ).getEditedPostAttribute( 'author' ),
			authors: select( 'core' ).getAuthors(),
		};
	} ),
	withDispatch( ( dispatch ) => ( {
		onUpdateAuthor( author ) {
			dispatch( 'core/editor' ).editPost( { author } );
		},
	} ) )
] );

/*

export default compose( [
	withSelect( ( select ) => {
		return {
			postAuthor: select( 'core/editor' ).getEditedPostAttribute( 'author' ),
		};
	} ),
	withDispatch( ( dispatch ) => ( {
		onUpdateAuthor( author ) {
			dispatch( 'core/editor' ).editPost( { author } );
		},
	} ) ),
	withAPIData( () => {
		return {
			users: '/wp/v2/users?context=edit&per_page=100',
		};
	} ),
	withInstanceId,
] )( PostAuthor );



export default compose( [
	applyConnect,
	withSelect( ( select ) => ( {
		author: select( 'core/editor' ).getEditedPostAttribute( state, 'author' ),
	} ) ),
	withAPIData( () => {
	withAPIData( ( { postType } ) => ( {
	return {
		user: `/wp/v2/users?context=edit&id=${ author }`,
	} ) ),
	withInstanceId,
	} ),
] )( PostAuthor );
	withInstanceId,
] )( PostAuthor );
*/
