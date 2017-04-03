const { html } = wp.blocks.query;
const Editable = wp.blocks.Editable;

wp.blocks.registerBlock( 'core/tinymce', {
	title: 'TinyMCE',
	icon: 'smiley',
	category: 'common',

	attributes: {
		value: html()
	},

	edit( { attributes, onChange } ) {
		return (
				<Editable
				value={ attributes.value }
				onChange={ ( value ) => onChange( { value } ) }
			/>
		);
	},

	save( { attributes } ) {
		return <p>{ attributes.value }</p>;
	}
} );
