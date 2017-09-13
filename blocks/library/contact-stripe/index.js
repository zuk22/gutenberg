/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { Placeholder, Toolbar, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/utils';
import moment from 'moment';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './style.scss';
import { registerBlockType, source } from '../../api';
import Editable from '../../editable';
import InspectorControls from '../../inspector-controls';
import TextControl from '../../inspector-controls/text-control';
import ToggleControl from '../../inspector-controls/toggle-control';
import RangeControl from '../../inspector-controls/range-control';
import BlockDescription from '../../block-description';
import BlockControls from '../../block-controls';
import BlockAlignmentToolbar from '../../block-alignment-toolbar';

const { text } = source;

registerBlockType( 'core/contact-stripe', {
	title: __( 'Contact Stripe' ),

	icon: 'list-view',

	category: 'layout',

	keywords: [ __( 'contact stripe' ) ],

	attributes: {
		address: {
			type: 'string',
		},
		align: {
			type: 'string'
		}
	},

	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( 'left' === align || 'right' === align || 'wide' === align || 'full' === align ) {
			return { 'data-align': align };
		}
	},

	edit( { attributes, setAttributes, focus, setFocus } ) {

		const { address } = attributes;

		return (
			<div className="contact-info-area  contact-info-footer-no-display">
				<div className="contact-info-wrapper">
					<span className="contact-info-address">
						<Editable
							tagName="span"
							className="contact-info-label"
							placeholder={ __( 'Write address...' ) }
							value={ address }
							focus={ focus }
							onFocus={ setFocus }
							onChange={ ( value ) => setAttributes( { address: value } ) }
						/>
					</span>

					<span className="contact-info-phone">
						<a href="tel:+1 555-555-555">
							<span className="contact-info-label">+1 555-555-555</span>
						</a>
					</span>

					<span className="contact-info-email">
						<a href="mailto:contact@mydomain.com">
							<span className="contact-info-label">contact@mydomain.com</span>
						</a>
					</span>

					<span className="contact-info-hours">
						<span className="contact-info-hours-text">Mon - Fri: 8am - 6pm</span>
					</span>
				</div>
			</div>
		);
	},

	save( { attributes } ) {
		const { address } = attributes;

		return (
			<div className="contact-info-area  contact-info-footer-no-display">
				<div className="contact-info-wrapper">
					<span className="contact-info-address">
						<a href={ "http://maps.google.com/maps?q=" + encodeURIComponent( address ) } target="_blank" className="customize-unpreviewable">
							{ address }
						</a>
					</span>

					<span className="contact-info-phone">
						<a href="tel:+1 555-555-555">
							<span className="contact-info-label">+1 555-555-555</span>
						</a>
					</span>

					<span className="contact-info-email">
						<a href="mailto:contact@mydomain.com">
							<span className="contact-info-label">contact@mydomain.com</span>
						</a>
					</span>

					<span className="contact-info-hours">
						<span className="contact-info-hours-text">Mon - Fri: 8am - 6pm</span>
					</span>
				</div>
			</div>
		);
	},
} );
