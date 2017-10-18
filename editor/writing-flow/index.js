/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * WordPress dependencies
 */
import { Component, cloneElement, Children } from 'element';
import { keycodes, focus } from '@wordpress/utils';

/**
 * Internal dependencies
 */
import { isEdge, placeCaretAtEdge } from '../utils/dom';
import {
	getBlockUids,
	getMultiSelectedBlocksStartUid,
	getMultiSelectedBlocksEndUid,
	getMultiSelectedBlocks,
	getSelectedBlock,
} from '../selectors';

import { multiSelect } from '../actions';

/**
 * Module Constants
 */
const { UP, DOWN, LEFT, RIGHT } = keycodes;

class WritingFlow extends Component {
	constructor() {
		super( ...arguments );

		this.onKeyDown = this.onKeyDown.bind( this );
		this.onBlockKeyDown = this.onBlockKeyDown.bind( this );
		this.bindContainer = this.bindContainer.bind( this );
	}

	bindContainer( ref ) {
		this.container = ref;
	}

	getEditables( blockNode ) {
		// Should we care about INPUT, TEXTAREA etc inside a block?
		const elements = blockNode.querySelectorAll( '[contenteditable="true"]' );
		return elements.length > 0 ? [ ...elements ] : [ blockNode ];
	}

	getVisibleTabbables() {
		return focus.tabbable
			.find( this.container )
			.filter( ( node ) => (
				node.nodeName === 'INPUT' ||
				node.nodeName === 'TEXTAREA' ||
				node.contentEditable === 'true' ||
				node.classList.contains( 'editor-visual-editor__block-edit' )
			) );
	}

	moveFocusInContainer( target, direction = 'UP' ) {
		const focusableNodes = this.getVisibleTabbables();
		if ( direction === 'UP' ) {
			focusableNodes.reverse();
		}

		const targetNode = focusableNodes
			.slice( focusableNodes.indexOf( target ) )
			.reduce( ( result, node ) => {
				return result || ( node.contains( target ) ? null : node );
			}, null );

		if ( targetNode ) {
			placeCaretAtEdge( targetNode, direction === 'DOWN' );
		}
	}

	expandSelection( blocks, currentStartUid, currentEndUid, moveUp ) {
		const delta = moveUp ? -1 : +1;
		const lastIndex = blocks.indexOf( currentEndUid );
		const nextIndex = Math.max( 0, Math.min( blocks.length - 1, lastIndex + delta ) );
		console.log('lastIndex', lastIndex, nextIndex);
		this.props.onMultiSelect( currentStartUid, blocks[ nextIndex ] );
	}

	isEditableEdge( moveUp, blockNode, target ) {
		const editables = this.getEditables( blockNode );
		const index = editables.length > 1 ? editables.indexOf( target ) : 0;
		const edgeIndex = moveUp ? 0 : editables.length - 1;
		return editables.length > 0 && index === edgeIndex;
	}

	onKeyDown( event ) {
		const { selectionStart, selectionEnd, blocks, hasMultiSelection } = this.props;

		const { keyCode, target } = event;
		const moveUp = ( keyCode === UP || keyCode === LEFT );
		const moveDown = ( keyCode === DOWN || keyCode === RIGHT );

		const isMoving = moveUp || moveDown;

		const isShift = event.shiftKey;
		if ( isMoving && isShift && hasMultiSelection ) {
			// Shift key is down and existing block selection
			event.preventDefault();
			this.expandSelection( blocks, selectionStart, selectionEnd, moveUp );
		} else if ( isMoving && isEdge( target, moveUp, isShift ) ) {
			// Shift key may be down, but we aren't at the edge of our overall block
			event.preventDefault();
			this.moveFocusInContainer( target, moveUp ? 'UP' : 'DOWN' );
		}
	}

	onBlockKeyDown( uid, event, blockNode ) {
		// Only if there isn't already multi-selection, do we care about this. Otherwise, we can let it bubble and be handled by the general keydown listener
		const { hasMultiSelection, blocks } = this.props;
		if ( hasMultiSelection ) {
			return;
		}

		const { keyCode, target } = event;
		const moveUp = ( keyCode === UP || keyCode === LEFT );
		const moveDown = ( keyCode === DOWN || keyCode === RIGHT );
		const isShift = event.shiftKey;

		const isMoving = moveUp || moveDown;
		if ( isMoving && isShift && this.isEditableEdge( moveUp, blockNode, target ) && isEdge( target, moveUp, true ) ) {
			console.log('expanding', uid );
			// Shift key is down, but no existing block selection
			event.preventDefault();
			event.stopPropagation();
			this.expandSelection( blocks, uid, uid, moveUp );
		}
	}

	render() {
		const { children } = this.props;

		return (
			<div
				ref={ this.bindContainer }
				onKeyDown={ this.onKeyDown }>
				{ Children.map( children, ( child ) => {
					return cloneElement( child, { onBlockKeyDown: this.onBlockKeyDown } );
				} ) }
			</div>
		);
	}
}

export default connect(
	( state ) => ( {
		blocks: getBlockUids( state ),
		selectionStart: getMultiSelectedBlocksStartUid( state ),
		selectionEnd: getMultiSelectedBlocksEndUid( state ),
		hasMultiSelection: getMultiSelectedBlocks( state ).length > 1,
		selectedBlock: getSelectedBlock( state ),
	} ),
	( dispatch ) => ( {
		onMultiSelect( start, end ) {
			dispatch( multiSelect( start, end ) );
		},
	} )
)( WritingFlow );
