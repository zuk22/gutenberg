/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { Placeholder, Spinner, Disabled } from '@wordpress/components';
import {
	withSelect,
	withDispatch,
	defaultRegistry,
	RegistryProvider,
} from '@wordpress/data';
import { EditorProvider, BlockList, createStore } from '@wordpress/editor';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { compose } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import SharedBlockEditPanel from './edit-panel';
import SharedBlockIndicator from './indicator';
import SharedBlockSelection from './selection';

class SharedBlockEdit extends Component {
	constructor( props ) {
		super( ...arguments );

		this.startEditing = this.toggleEditing.bind( this, true );
		this.stopEditing = this.toggleEditing.bind( this, false );
		this.registry = defaultRegistry.clone();
		createStore( this.registry );

		const { sharedBlock, settings } = props;
		this.state = {
			isEditing: !! ( sharedBlock && sharedBlock.isTemporary ),
			settingsWithLock: { ...settings, templateLock: true },
		};
	}

	static getDerivedStateFromProps( props, prevState ) {
		if ( isShallowEqual( props.settings, prevState.settings ) ) {
			return null;
		}

		return {
			settings: props.settings,
			settingsWithLock: {
				...props.settings,
				templateLock: true,
			},
		};
	}

	toggleEditing( isEditing ) {
		this.setState( { isEditing } );
	}

	render() {
		const { setIsSelected, sharedBlock, isSelected, isSaving } = this.props;
		const { settingsWithLock, isEditing } = this.state;

		if ( ! sharedBlock ) {
			return <Placeholder><Spinner /></Placeholder>;
		}

		let list = <BlockList />;
		if ( ! isEditing ) {
			list = <Disabled>{ list }</Disabled>;
		}

		return (
			<RegistryProvider value={ this.registry }>
				<EditorProvider
					postType="wp_block"
					inheritContext
					settings={ settingsWithLock }
					post={ sharedBlock }
				>
					<SharedBlockSelection
						isSharedBlockSelected={ isSelected }
						onBlockSelection={ setIsSelected }
					>
						{ list }
						{ ( isSelected || isEditing ) && (
							<SharedBlockEditPanel
								isEditing={ isEditing }
								isSaving={ isSaving && ! sharedBlock.isTemporary }
								onEdit={ this.startEditing }
								onFinishedEditing={ this.stopEditing }
							/>
						) }
						{ ! isSelected && ! isEditing && <SharedBlockIndicator /> }
					</SharedBlockSelection>
				</EditorProvider>
			</RegistryProvider>
		);
	}
}

export default compose( [
	withSelect( ( select, ownProps ) => {
		const { ref } = ownProps.attributes;
		if ( ! Number.isFinite( ref ) ) {
			return;
		}

		const { getEntityRecord } = select( 'core' );
		return {
			sharedBlock: getEntityRecord( 'postType', 'wp_block', ref ),
			settings: select( 'core/editor' ).getEditorSettings(),
		};
	} ),
	withDispatch( ( dispatch, ownProps ) => {
		const { selectBlock } = dispatch( 'core/editor' );
		const { id } = ownProps;

		return {
			setIsSelected: () => selectBlock( id ),
		};
	} ),
] )( SharedBlockEdit );
