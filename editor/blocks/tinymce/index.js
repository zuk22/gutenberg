const { html } = wp.blocks.query;
const Editable = wp.blocks.Editable;

wp.blocks.registerBlock( 'ephox/tinymce', {
	title: 'TinyMCE',
	icon: 'smiley',

	attributes: {
		value: html()
	},

	edit( attributes, onChange ) {
		return (
			<Editable
				value={ attributes.value }
				onChange={ ( value ) => onChange( { value } ) }
			/>
		);
	},

	save( attributes ) {
		return attributes.value;
	}
} );
