/**
 * External dependencies
 */
import TextareaAutosize from 'react-autosize-textarea';
import { isEqual } from 'lodash';

/**
 * WordPress dependencies
 */
import { Component, findDOMNode } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './editor.scss';
import InspectorControls from '../../inspector-controls';
import BlockDescription from '../../block-description';

class CodeBlock extends Component {
	constructor() {
		super( ...arguments );

		this.bindRef = this.bindRef.bind( this );
		this.updateFocus = this.updateFocus.bind( this );

		this.textareaRef = null;
	}

	bindRef( nodeRef ) {
		this.textareaRef = nodeRef;
	}

	updateFocus() {
		const { focus } = this.props;
		if ( ! this.textareaRef ) {
			return;
		}
		const textarea = findDOMNode( this.textareaRef );
		if ( focus && ! textarea.contains( document.activeElement ) ) {
			if ( focus.offset === -1 ) {
				setTimeout( () => {
					textarea.focus();
					textarea.setSelectionRange( textarea.value.length, textarea.value.length );
				}, 0 );
			} else {
				setTimeout( () => textarea.focus(), 0 );
			}
		}
	}

	componentDidUpdate( prevProps ) {
		if ( ! isEqual( this.props.focus, prevProps.focus ) ) {
			this.updateFocus();
		}
	}

	componentDidMount() {
		this.updateFocus();
	}

	render() {
		const { attributes, setAttributes, focus, className } = this.props;
		return [
			focus && (
			<InspectorControls key="inspector">
				<BlockDescription>
					<p>{ __( 'The code block maintains spaces and tabs, great for showing code snippets.' ) }</p>
				</BlockDescription>
			</InspectorControls>
			),
			<TextareaAutosize
				key="block"
				className={ className }
				value={ attributes.content }
				onChange={ ( event ) => setAttributes( { content: event.target.value } ) }
				placeholder={ __( 'Write code…' ) }
				ref={ this.bindRef }
			/>,
		];
	}
}
export default CodeBlock;
