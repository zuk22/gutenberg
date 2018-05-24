/**
 * External dependencies
 */
import ResizableBox from 're-resizable';

/**
 * WordPress
 */
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/editor';
import { BaseControl, PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './editor.scss';

export const name = 'core/spacer';

export const settings = {
	title: __( 'Spacer' ),

	description: __( 'Add an element with empty space and custom height.' ),

	icon: <svg height="36" width="36" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M13 4v2h3.59L6 16.59V13H4v7h7v-2H7.41L18 7.41V11h2V4h-7"/></g></svg>,

	category: 'layout',

	attributes: {
		height: {
			type: 'number',
			default: 100,
		},
	},

	edit( { attributes, setAttributes, toggleSelection } ) {
		const { height } = attributes;

		return (
			<Fragment>
				<ResizableBox
					size={ {
						height,
					} }
					minHeight="20"
					handleClasses={ {
						top: 'wp-block-spacer__resize-handler-top',
						bottom: 'wp-block-spacer__resize-handler-bottom',
					} }
					enable={ {
						top: true,
						right: false,
						bottom: true,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false,
					} }
					onResizeStop={ ( event, direction, elt, delta ) => {
						setAttributes( {
							height: parseInt( height + delta.height, 10 ),
						} );
						toggleSelection( true );
					} }
					onResizeStart={ () => {
						toggleSelection( false );
					} }
				/>
				<InspectorControls>
					<PanelBody title={ __( 'Spacer Settings' ) }>
						<BaseControl label={ __( 'Height in pixels' ) }>
							<input
								type="number"
								onChange={ ( event ) => {
									setAttributes( {
										height: parseInt( event.target.value, 10 ),
									} );
								} }
								aria-label={ __( 'Height for the spacer element in pixels.' ) }
								value={ height }
								min="20"
								step="10"
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	},

	save( { attributes } ) {
		return <div style={ { height: attributes.height } } aria-hidden />;
	},
};
