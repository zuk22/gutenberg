import { Component } from '@wordpress/element';

class Annotations extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			annotationsLength: 0,
		};
	}

	shouldComponentUpdate( nextProps, nextState ) {
		return nextProps.annotations.length !== this.state.annotationsLength;

		// return nextProps.annotations !== this.props.annotations;
	}

	static getDerivedStateFromProps( props, state ) {
		return {
			annotationsLength: props.annotations.length,
		};
	}

	/**
	 * Sets up event handlers to track changes to annotations.
	 */
	componentDidMount() {
		const editor = this.props.editor;

		editor.on( 'wp.annotation-moved', ( data ) => {
			this.props.onMove( data.uid, data.xpath );
		} );
	}

	/**
	 * Calls the annotation methods on the annotations plugin.
	 *
	 * This causes us to have a declarative API on top of tinyMCE's imperative API.
	 *
	 * @return {null} Always returns null to not render anything.
	 */
	render() {
		const { annotations, editor } = this.props;

		const annotationsPlugin = editor.plugins[ 'wp-annotations' ];

		try {
			// This way we get a declarative UI for annotations on top of the imperative
			// UI of tinyMCE.
			annotationsPlugin.removeAllAnnotations();
			annotationsPlugin.setAnnotations( annotations.map( ( annotation ) => {
				return {
					uid: annotation.id,
					xpath: {
						start: annotation.startXPath,
						startOffset: annotation.startOffset,
						end: annotation.endXPath,
						endOffset: annotation.endOffset,
					},
				};
			} ) );

		// Catch here because componentDidCatch catches only in child components.
		} catch ( error ) {
			console.error( 'Error occurred in anotations module', error );
			this.props.onError();
		}

		return null;
	}
}

export default Annotations;
