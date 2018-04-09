/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './editor.scss';
import InspectorControls from '../../inspector-controls';

export edit( { attributes, setAttributes, isSelected } ) {
  const { customText, noTeaser } = attributes;

  const toggleNoTeaser = () => setAttributes( { noTeaser: ! noTeaser } );
  const defaultText = __( 'Read more' );
  const value = customText !== undefined ? customText : defaultText;
  const inputLength = value.length ? value.length + 1 : 1;

  return [
    isSelected && (
      <InspectorControls key="inspector">
        <ToggleControl
          label={ __( 'Hide the teaser before the "More" tag' ) }
          checked={ !! noTeaser }
          onChange={ toggleNoTeaser }
        />
      </InspectorControls>
    ),
    <div key="more-tag" className="wp-block-more">
      <input
        type="text"
        value={ value }
        size={ inputLength }
        onChange={ ( event ) => setAttributes( { customText: event.target.value } ) }
      />
    </div>,
  ];
},
