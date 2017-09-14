/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';
import { registerBlockType, source } from '../../api';
import Editable from '../../editable';

const { text } = source;

registerBlockType( 'core/contact-stripe', {
	title: __( 'Contact Stripe' ),

	icon: 'list-view',

	category: 'layout',

	keywords: [ __( 'contact stripe' ) ],

	attributes: {
		address: {
			type: 'string',
			source: text( '.wp-block-contact-info__address' ),
		},
		phone: {
			type: 'string',
			source: text( '.wp-block-contact-info__phone' ),
		},
		email: {
			type: 'string',
			source: text( '.wp-block-contact-info__email' ),
		},
		hours: {
			type: 'string',
			source: text( '.wp-block-contact-info__hours' ),
		},
	},

	edit( { attributes, setAttributes, focus, setFocus } ) {
		const { address, phone, email, hours } = attributes;

		return (
			<div className="editor-contact-info">
				<div className="editor-contact-info__wrapper">
					<span className="contact-info-address">
						<Editable
							tagName="span"
							className="contact-info-label"
							placeholder={ __( 'Write address...' ) }
							value={ address }
							onChange={ ( value ) => setAttributes( { address: value } ) }
						/>
					</span>

					<span className="contact-info-phone">
						<Editable
							tagName="span"
							className="contact-info-label"
							placeholder={ __( 'Write phone number...' ) }
							value={ phone }
							onChange={ ( value ) => setAttributes( { phone: value } ) }
						/>
					</span>

					<span className="contact-info-email">
						<Editable
							tagName="span"
							className="contact-info-label"
							placeholder={ __( 'Write email...' ) }
							value={ email }
							onChange={ ( value ) => setAttributes( { email: value } ) }
						/>
					</span>

					<span className="contact-info-hours">
						<Editable
							tagName="span"
							className="contact-info-label"
							placeholder={ __( 'Write opening hours...' ) }
							value={ hours }
							onChange={ ( value ) => setAttributes( { hours: value } ) }
						/>
					</span>
				</div>
			</div>
		);
	},

	save( { attributes } ) {
		const { address, phone, email, hours } = attributes;

		return (
			<div className="wp-block-contact-info">
				<div className="wp-block-contact-info__wrapper">
					<span>
						<a
							href={ "http://maps.google.com/maps?q=" + encodeURIComponent( address ) }
							target="_blank"
							className="wp-block-contact-info__address"
						>
							{ address }
						</a>
					</span>

					<span>
						<a href="tel:+1 555-555-555">
							<span className="contact-info-label wp-block-contact-info__phone">
								{ phone }
							</span>
						</a>
					</span>

					<span>
						<a href={ "mailto:" + email }>
							<span className="contact-info-label wp-block-contact-info__email">
								{ email }
							</span>
						</a>
					</span>

					<span>
						<span className="contact-info-hours-text wp-block-contact-info__hours">
							{ hours }
						</span>
					</span>
				</div>
			</div>
		);
	},
} );
