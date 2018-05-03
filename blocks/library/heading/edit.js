/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { PanelBody, Toolbar } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './editor.scss';
import { createBlock } from '../../api';
import RichText from '../../rich-text';
import BlockControls from '../../block-controls';
import InspectorControls from '../../inspector-controls';
import AlignmentToolbar from '../../alignment-toolbar';

export function edit( { attributes, setAttributes, isSelected, mergeBlocks, insertBlocksAfter, onReplace, className } ) {
	const { align, content, nodeName, placeholder } = attributes;

	return [
		isSelected && (
			<BlockControls
				key="controls"
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
		),
		isSelected && (
			<InspectorControls key="inspector">
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
		),
		<RichText
			key="editable"
			wrapperClassName="wp-block-heading"
			tagName={ nodeName.toLowerCase() }
			value={ content }
			onChange={ ( value ) => setAttributes( { content: value } ) }
			onMerge={ mergeBlocks }
			onSplit={
				insertBlocksAfter ?
					( before, after, ...blocks ) => {
						setAttributes( { content: before } );
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
			isSelected={ isSelected }
		/>,
	];
}
