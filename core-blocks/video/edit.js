/**
 * External dependencies
 */
import { map } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Button,
	ButtonGroup,
	IconButton,
	PanelBody,
	SelectControl,
	TextControl,
	Toolbar,
	ToggleControl,
	withNotices,
} from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import {
	BlockControls,
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
	RichText,
} from '@wordpress/editor';

/**
 * Internal dependencies
 */
import './editor.scss';

class VideoEdit extends Component {
	constructor() {
		super( ...arguments );
		// edit component has its own src in the state so it can be edited
		// without setting the actual value outside of the edit UI
		this.state = {
			editing: ! this.props.attributes.sources.length,
		};

		this.toggleAttribute = this.toggleAttribute.bind( this );
		this.setSubtitleAttributes = this.setSubtitleAttributes.bind( this );
		this.addSubtitle = this.addSubtitle.bind( this );
		this.onSelectPoster = this.onSelectPoster.bind( this );
		this.onRemovePoster = this.onRemovePoster.bind( this );
		this.videoSourceTypeExists = this.videoSourceTypeExists.bind( this );
		this.addSource = this.addSource.bind( this );
	}

	toggleAttribute( attribute ) {
		return ( newValue ) => {
			this.props.setAttributes( { [ attribute ]: newValue } );
		};
	}

	setSubtitleAttributes( index, attributes ) {
		const { attributes: { subtitles }, setAttributes } = this.props;
		if ( ! subtitles[ index ] ) {
			return;
		}
		setAttributes( {
			subtitles: [
				...subtitles.slice( 0, index ),
				{
					...subtitles[ index ],
					...attributes,
				},
				...subtitles.slice( index + 1 ),
			],
		} );
	}

	addSubtitle() {
		const { attributes: { subtitles }, setAttributes } = this.props;
		setAttributes( {
			subtitles: [ ...subtitles, {} ],
		} );
	}

	removeSubtitle( index ) {
		const { attributes: { subtitles }, setAttributes } = this.props;
		const tempSubtitles = [ ...subtitles ];
		tempSubtitles.splice( index, 1 );
		setAttributes( {
			subtitles: tempSubtitles,
		} );
	}

	onSelectPoster( image ) {
		const { setAttributes } = this.props;
		setAttributes( { poster: image.url } );
		document.getElementById( 'block-' + this.props.id ).getElementsByTagName( 'video' )[ 0 ].load();
	}

	onRemovePoster() {
		const { setAttributes } = this.props;
		setAttributes( { poster: '' } );
	}

	videoSourceTypeExists( type ) {
		return this.props.attributes.sources.find( ( source ) => type === source.type );
	}

	removeSource( url ) {
		const { setAttributes, attributes } = this.props;
		const filteredSources = attributes.sources.filter( ( source ) => source.url !== url );
		setAttributes( {
			sources: filteredSources,
		} );
	}

	addSource( media ) {
		const { setAttributes, attributes } = this.props;
		const type = media.mime || this.getVideoMimeType( media.url );
		setAttributes( {
			sources: [ ...attributes.sources, { src: media.url, type } ],
		} );
	}

	getVideoMimeType( url ) {
		const fileType = url.substring( url.lastIndexOf( '.' ) + 1 );
		let mime = 'undefined';
		switch ( fileType ) {
			case 'mp4':
				mime = 'video/mp4';
				break;
			case 'webm':
				mime = 'video/webm';
				break;
			case 'ogv':
				mime = 'video/ogg';
				break;
		}
		return mime;
	}

	render() {
		const {
			autoplay,
			caption,
			controls,
			loop,
			muted,
			poster,
			preload,
			sources,
			subtitles,
		} = this.props.attributes;
		const { setAttributes, isSelected, className, noticeOperations, noticeUI } = this.props;
		const switchToEditing = () => {
			setAttributes( { sources: [] } );
		};
		const onSelectVideo = ( media ) => {
			if ( ! media || ! media.id ) {
				// in this case there was an error and we should continue in the editing state
				// previous attributes should be removed because they may be temporary blob urls
				setAttributes( { sources: [] } );
				return;
			}
			this.addSource( media );
		};
		const onSelectUrl = ( newSrc ) => {
			setAttributes( { sources: [ { src: newSrc, type: this.getVideoMimeType( newSrc ) } ] } );
		};

		if ( ! sources.length ) {
			return (
				<MediaPlaceholder
					icon="media-video"
					labels={ {
						title: __( 'Video' ),
						name: __( 'a video' ),
					} }
					className={ className }
					onSelect={ onSelectVideo }
					onSelectUrl={ onSelectUrl }
					accept="video/*"
					type="video"
					value={ this.props.attributes }
					notices={ noticeUI }
					onError={ noticeOperations.createErrorNotice }
				/>
			);
		}

		/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
		return (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<IconButton
							className="components-icon-button components-toolbar__control"
							label={ __( 'Edit video' ) }
							onClick={ switchToEditing }
							icon="edit"
						/>
					</Toolbar>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( 'Playback Controls' ) }>
						<ToggleControl
							label={ __( 'Autoplay' ) }
							onChange={ this.toggleAttribute( 'autoplay' ) }
							checked={ autoplay }
						/>
						<ToggleControl
							label={ __( 'Controls' ) }
							onChange={ this.toggleAttribute( 'controls' ) }
							checked={ controls }
						/>
						<ToggleControl
							label={ __( 'Loop' ) }
							onChange={ this.toggleAttribute( 'loop' ) }
							checked={ loop }
						/>
						<ToggleControl
							label={ __( 'Muted' ) }
							onChange={ this.toggleAttribute( 'muted' ) }
							checked={ muted }
						/>
						<div className="core-blocks-video__poster">
							<p>
								{ __( 'Poster Image' ) }
							</p>
							<MediaUpload
								title={ 'Select Poster Image' }
								onSelect={ this.onSelectPoster }
								type="image"
								modalClass="editor-post-featured-image__media-modal"
								render={ ( { open } ) => (
									<Button isDefault onClick={ open }>
										{ ! this.props.attributes.poster ? __( 'Select Poster Image' ) : __( 'Replace image' ) }
									</Button>
								) }
							/>
							{ !! this.props.attributes.poster &&
								<Button onClick={ this.onRemovePoster } isLink isDestructive>
									{ __( 'Remove Poster Image' ) }
								</Button>
							}
						</div>
					</PanelBody>
					<PanelBody title={ __( 'Sources' ) }>
						{ sources.map( ( source ) => {
							return (
								<div key={ source.src }>
									<TextControl
										type="text"
										label={ source.type }
										value={ source.src }
										disabled
									/>
									<Button
										isLink
										className="is-destructive"
										onClick={ () => this.removeSource( source.src ) }
									>{ __( 'Remove video source' ) }</Button>
								</div>
							);
						} ) }

						{ sources.length < 3 && ( <p>Add alternate sources for maximum HTML5 playback:</p> ) }
						{ ! this.videoSourceTypeExists( 'video/mp4' ) && (
							<MediaUpload
								title={ 'Add Video Source' }
								onSelect={ this.addSource }
								type="video/mp4"
								render={ ( { open } ) => (
									<Button isDefault onClick={ open }>
										mp4
									</Button>
								) }
							/>
						) }
						{ ! this.videoSourceTypeExists( 'video/ogg' ) && (
							<MediaUpload
								title={ 'Add Video Source' }
								onSelect={ this.addSource }
								type="video/ogg"
								render={ ( { open } ) => (
									<Button isDefault onClick={ open }>
										ovg
									</Button>
								) }
							/>
						) }
						{ ! this.videoSourceTypeExists( 'video/webm' ) && (
							<MediaUpload
								title={ 'Add Video Source' }
								onSelect={ this.addSource }
								type="video/webm"
								render={ ( { open } ) => (
									<Button isDefault onClick={ open }>
										webm
									</Button>
								) }
							/>
						) }

					</PanelBody>
					<PanelBody title={ __( 'Preload' ) }>
						<ButtonGroup aria-label={ __( 'Preload' ) }>
							{ map( [
								{
									name: __( 'Auto' ),
									key: 'auto',
									attributeValue: 'auto',
								},
								{
									name: __( 'Metadata' ),
									key: 'metadata',
									attributeValue: 'metadata',
								},
								{
									name: __( 'None' ),
									key: 'none',
									attributeValue: undefined,
								},
							], ( { name, key, attributeValue } ) => (
								<Button
									key={ key }
									isLarge
									isPrimary={ attributeValue === preload }
									aria-pressed={ attributeValue === preload }
									onClick={ () => setAttributes( { preload: attributeValue } ) }
								>
									{ name }
								</Button>
							) ) }
						</ButtonGroup>
					</PanelBody>
					<PanelBody title={ __( 'Subtitles' ) }>
						{ subtitles.map( ( subtitle, index ) => {
							return (
								<div key={ subtitle.src } className="subtitle-track">
									<TextControl
										type="text"
										className="core-blocks-subtitle__srclang"
										label={ __( 'srclang' ) }
										value={ subtitle.srclang }
										placeholder="en"
										help={ __( 'Valid BCP 47 language tag' ) }
										onChange={ ( newValue ) => this.setSubtitleAttributes( index, { srclang: newValue } ) }
									/>
									<TextControl
										type="text"
										className="core-blocks-subtitle__label"
										label={ __( 'Label' ) }
										value={ subtitle.label }
										placeholder="English"
										onChange={ ( newValue ) => this.setSubtitleAttributes( index, { label: newValue } ) }
									/>
									<div>
										<SelectControl
											label={ __( 'Source Type' ) }
											value={ subtitle.kind }
											options={ [
												{ value: 'subtitles', label: __( 'Subtitles' ) },
												{ value: 'captions', label: __( 'Captions' ) },
												{ value: 'descriptions', label: __( 'Descriptions' ) },
												{ value: 'chapters', label: __( 'Chapters' ) },
												{ value: 'metadata', label: __( 'Metadata' ) },
											] }
											onChange={ ( newValue ) => this.setSubtitleAttributes( index, { kind: newValue } ) }
										/>
									</div>
									<TextControl
										type="text"
										className="core-blocks-subtitle__src"
										label={ __( 'Source' ) }
										value={ subtitle.src }
										onChange={ ( newValue ) => this.setSubtitleAttributes( index, { src: newValue } ) }
									/>
									<Button isDefault>Change File</Button>
									<Button isLink className="is-destructive" onClick={ () => this.removeSubtitle( index ) }>Remove Video Track</Button>
								</div>
							);
						} ) }
						<Button isDefault onClick={ this.addSubtitle }>Add Subtitle</Button>
					</PanelBody>
				</InspectorControls>
				<figure className={ className }>
					<video
						controls={ controls }
						loop={ loop }
						muted={ muted }
						poster={ poster }
					>
						{ sources.map( ( source ) => {
							return (
								<source
									key={ source.src }
									src={ source.src }
									type={ source.type }
								/>
							);
						} ) }

						{ subtitles.map( ( subtitle ) => {
							return (
								<track
									key={ subtitle.src }
									srcLang={ subtitle.srclang }
									label={ subtitle.label }
									kind={ subtitle.kind }
									src={ subtitle.src }
								/>
							);
						} ) }
					</video>

					{ ( ( caption && caption.length ) || !! isSelected ) && (
						<RichText
							tagName="figcaption"
							placeholder={ __( 'Write caption…' ) }
							value={ caption }
							onChange={ ( value ) => setAttributes( { caption: value } ) }
							inlineToolbar
						/>
					) }
				</figure>
			</Fragment>
		);
		/* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
	}
}

export default withNotices( VideoEdit );
