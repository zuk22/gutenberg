/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, Toolbar } from '@wordpress/components';
import {
	createBlock,
	RichText,
	BlockControls,
	InspectorControls,
	AlignmentToolbar,
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './editor.scss';

export function edit( { attributes, setAttributes, mergeBlocks, insertBlocksAfter, onReplace, className } ) {
	const { align, content, nodeName, placeholder } = attributes;

	return (
		<Fragment>
			<BlockControls
				controls={
					'234'.split( '' ).map( ( level ) => ( {
						icon: 'heading',
						title: sprintf( __( 'Heading %s' ), level ),
						isActive: 'H' + level === nodeName,
						onClick: () => setAttributes( { nodeName: 'H' + level } ),
						subscript: level,
					} ) )
				}
			/>
			<InspectorControls>
				<PanelBody title={ __( 'Heading Settings' ) }>
					<p>{ __( 'Level' ) }</p>
					<Toolbar
						controls={
							'123456'.split( '' ).map( ( level ) => ( {
								icon: 'heading',
								title: sprintf( __( 'Heading %s' ), level ),
								isActive: 'H' + level === nodeName,
								onClick: () => setAttributes( { nodeName: 'H' + level } ),
								subscript: level,
							} ) )
						}
					/>
					<p>{ __( 'Text Alignment' ) }</p>
					<AlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<RichText
				wrapperClassName="wp-block-heading"
				tagName={ nodeName.toLowerCase() }
				value={ content }
				onChange={ ( value ) => setAttributes( { content: value } ) }
				onMerge={ mergeBlocks }
				onSplit={
					insertBlocksAfter ?
						( unused, after, ...blocks ) => {
							insertBlocksAfter( [
								...blocks,
								createBlock( 'core/paragraph', { content: after } ),
							] );
						} :
						undefined
				}
				onRemove={ () => onReplace( [] ) }
				style={ { textAlign: align } }
				className={ className }
				placeholder={ placeholder || __( 'Write heading…' ) }
			/>
		</Fragment>
	);
}
