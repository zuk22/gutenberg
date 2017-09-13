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
import { registerBlockType } from '../../api';
import InspectorControls from '../../inspector-controls';
import TextControl from '../../inspector-controls/text-control';
import ToggleControl from '../../inspector-controls/toggle-control';
import RangeControl from '../../inspector-controls/range-control';
import BlockDescription from '../../block-description';
import BlockControls from '../../block-controls';
import BlockAlignmentToolbar from '../../block-alignment-toolbar';

registerBlockType( 'core/contact-stripe', {
	title: __( 'Contact Stripe' ),

	icon: 'list-view',

	category: 'layout',

	keywords: [ __( 'contact stripe' ) ],

	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( 'left' === align || 'right' === align || 'wide' === align || 'full' === align ) {
			return { 'data-align': align };
		}
	},

	edit() {
		return (
			<div className="contact-info-area  contact-info-footer-no-display">
				<div className="contact-info-wrapper">
					<span className="contact-info-address">
						<a href="http://maps.google.com/maps?q=4600+international+gateway,+columbus,+oh+43219,+usa" target="_blank" className="customize-unpreviewable">
							<svg className="icon icon-location" aria-hidden="true" role="img">
								{/*<use href="#icon-location" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-location"></use>*/}
							</svg>
							<span className="contact-info-label">4600 International Gateway, Columbus, OH 43219, USA</span>
						</a>
					</span>

					<span className="contact-info-phone">
						<a href="tel:+1 555-555-555">
							<svg className="icon icon-phone" aria-hidden="true" role="img">
								{/*<use href="#icon-phone" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-phone"></use>*/}
							</svg>
						<span className="contact-info-label">+1 555-555-555</span>
						</a>
					</span>

					<span className="contact-info-email">
						<a href="mailto:contact@mydomain.com">
							<svg className="icon icon-mail" aria-hidden="true" role="img">
								{/*<use href="#icon-mail" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-mail"></use>*/}
							</svg>
							<span className="contact-info-label">contact@mydomain.com</span>
						</a>
					</span>

					<span className="contact-info-hours">
						<svg className="icon icon-time" aria-hidden="true" role="img">
							{/*<use href="#icon-time" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-time"></use>*/}
						</svg>
						<span className="contact-info-hours-text">Mon - Fri: 8am - 6pm</span>
					</span>
				</div>
			</div>
		);
	},

	save() {
		return null;
	},
} );
