#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require( 'fs-extra' );
const path = require( 'path' );
const marked = require( 'marked' );
const outline = require( '../docs/outline' );

const DOCS_DIR = path.join( __dirname, '..', 'docs' );
const OUTPUT_DIR = path.join( DOCS_DIR, 'build' );

function slugify( text ) {
	return text.toLowerCase()
		.replace( /\s+/g, '-' )
		.replace( /[^\w\-]+/g, '' )
		.replace( /--+/g, '-' )
		.replace( /^-+/, '' )
		.replace( /-+$/, '' );
}

function getNextPageLink( page ) {
	let next;
	if ( page.children ) {
		next = page.children[ 0 ];
	} else if ( page.parent ) {
		let child = page;
		let parent = page.parent;
		while ( ! next && parent ) {
			const index = parent.children.indexOf( child );
			next = parent.children[ index + 1 ];
			child = parent;
			parent = parent.parent;
		}
	}

	if ( ! next ) {
		return '';
	}

	return `
		<a href="/${ next.path }" rel="next">
			${ next.title }&nbsp;
			<span class="meta-nav">→</span>
		</a>
		`;
}

function getNavigationItems( pages, currentPage ) {
	return pages.map( ( page ) => {
		let result = `
			<li class="menu-item${ currentPage.path === page.path ? ' current-menu-item' : '' }">
				<a href="/${ page.path }">${ page.title }</a>
			`;

		if ( page.children && page.children.length ) {
			result += `
				<ul class="sub-menu">
					${ getNavigationItems( page.children, currentPage ) }
				</ul>
				`;
		}

		result += '</li>';

		return result;
	} ).join( '' );
}

function getTableOfContentsItems( headings ) {
	return headings.map( ( [ title, children ] ) => {
		let result = `
			<li>
				<a href="#${ slugify( title ) }">${ title }</a>
			`;

		if ( children && children.length ) {
			result += `<ul>${ getTableOfContentsItems( children ) }</ul>`;
		}

		result += '</li>';

		return result;
	} ).join( '' );
}

async function getPageContent( page ) {
	const content = await fs.readFile( `${ DOCS_DIR }/${ page.file }`, 'utf8' );
	const renderer = new marked.Renderer();
	const headings = [];

	renderer.heading = ( text, level ) => {
		if ( 1 === level ) {
			return '';
		}

		let headingsRef = headings;
		for ( let i = 0; i < level - 2; i++ ) {
			headingsRef = headingsRef[ headingsRef.length - 1 ];

			if ( ! Array.isArray( headingsRef[ 1 ] ) ) {
				headingsRef[ 1 ] = [];
			}

			headingsRef = headingsRef[ 1 ];
		}

		headingsRef.push( [ text, [] ] );

		return `
			${ headings.length > 1 ? '<p class="toc-jump"><a href="#top">Top ↑</a></p>' : '' }
			<h${ level } class="toc-heading" id="${ slugify( text ) }" tabindex="-1">
				${ text }&nbsp;
				<a href="#${ slugify( text ) }" class="anchor">
					<span aria-hidden="true">#</span>
					<span class="screen-reader-text">${ text }</span>
				</a>
			</h${ level }>
			`;
	};

	renderer.code = ( code, lang ) => {
		if ( ! lang ) {
			return `<pre><code>${ code }\n</code></pre>`;
		}

		return `<pre class="language-${ lang } line-numbers"><code>${ code }</code></pre>`;
	};

	return new Promise( ( resolve, reject ) => {
		marked( content, { renderer }, ( error, html ) => {
			if ( error ) {
				reject( error );
			} else {
				resolve( [ html, headings ] );
			}
		} );
	} );
}

async function writePageContent( page, html ) {
	const filename = path.join( OUTPUT_DIR, page.path, 'index.html' );

	await fs.ensureDir( path.dirname( filename ) );

	return await fs.writeFile( filename, html );
}

async function buildPage( page ) {
	const [ content, headings ] = await getPageContent( page );

	let html = `
		<!DOCTYPE html>
		<html>
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<title>WordPress</title>
			<link href="https://s.w.org/wp-includes/css/dashicons.css?20160504" rel="stylesheet" type="text/css" />
			<link media="only screen and (max-device-width: 480px)" href="https://s.w.org/style/iphone.css?1" type="text/css" rel="stylesheet" />
			<link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,400,300,600&subset=latin,cyrillic-ext,greek-ext,greek,vietnamese,latin-ext,cyrillic' rel='stylesheet' type='text/css'>
			<link rel="stylesheet" href="https://s.w.org/style/wp4.css?58" />
			<link rel="shortcut icon" href="https://s.w.org/favicon.ico?2" type="image/x-icon" />
			<script src="https://s.w.org/wp-includes/js/jquery/jquery.js?v=1.11.1"></script>
			<!--[if lte IE 8]>
			<style type="text/css">
			@import url("https://s.w.org/style/ie.css?1");
			</style>
			<![endif]-->

			<link rel="stylesheet" href="https://developer.wordpress.org/wp-content/themes/pub/wporg-developer/stylesheets/main.css?ver=20170621" />
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism-coy.min.css">
			<style>pre[class*=language-] { box-shadow: -1px 0 0 0 #21759b, 0 0 0 1px #dfdfdf; } pre[class*=language-]:before, pre[class*=language-]:after { display: none; }</style>
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/plugins/line-numbers/prism-line-numbers.min.css">
			<style>blockquote { padding: 20px; margin: 0 0 1.5em; } blockquote p:last-child { margin-bottom: 0; }</style>
		</head>
		<body id="wordpress-org">

		<div id="page" class="site devhub-wrap single-handbook">
			<header id="masthead" class="site-header" role="banner">
				<div class="inner-wrap">
					<div class="site-branding">
						<h1 class="site-title">
							<a href="/" rel="home">Gutenberg</a>
						</h1>
					</div>
				</div>
			</header>
			<div id="content-area" class="has-sidebar">
				<main id="main" class="site-main" role="main">
					<h1>${ page.title }</h1>

					<style> .toc-jump { text-align: right; font-size: 12px; } .page .toc-heading { margin-top: -50px; padding-top: 50px !important; }</style>
					${ headings.length ? (
						`<div class="table-of-contents">
							<h2>Topics</h2>
							<ul class="items">
								${ getTableOfContentsItems( headings ) }
							</ul>
						</div>`
					) : '' }
		`;

	html += content;

	html += `
					<div class="bottom-of-entry">&nbsp;</div>

					<nav class="handbook-navigation" role="navigation">
						<h1 class="screen-reader-text">Handbook navigation</h1>
						<div class="nav-links">
							${ getNextPageLink( page ) }
						</div>
					</nav>
				</main>

				<div id="sidebar" class="widget-area sidebar section" role="complementary">
					<aside id="nav_menu-4" class="widget widget_nav_menu">
						<h2 class="widget-title">Chapters</h2>
						<ul class="menu">
							${ getNavigationItems( outline, page ) }
						</ul>
					</aside>
				</div>
			</div>
		</div>

		<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/components/prism-core.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/components/prism-markup.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/components/prism-clike.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/components/prism-javascript.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/components/prism-jsx.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/plugins/line-numbers/prism-line-numbers.js"></script>

		</body>
		</html>`;

	return writePageContent( page, html );
}

async function buildPageAndChildren( page, parent ) {
	page.parent = parent;

	return Promise.all( [
		buildPage( page ),
		...( page.children || [] ).map( ( child ) => buildPageAndChildren( child, page ) ),
	] );
}

async function buildDocs() {
	return Promise.all( outline.map( ( page ) => buildPageAndChildren( page, { children: outline } ) ) );
}

buildDocs().then(
	() => console.log( 'Done.' ),
	( error ) => console.log( 'Failure:\n\n' + error.stack )
);
