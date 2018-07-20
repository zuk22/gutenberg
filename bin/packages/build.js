/**
 * script to build WordPress packages into `build/` directory.
 *
 * Example:
 *  node ./scripts/build.js
 */

/**
 * External dependencies
 */
const { promisify } = require( 'util' );
const fs = require( 'fs' );
const path = require( 'path' );
let glob = require( 'glob' );
const babel = require( '@babel/core' );
const chalk = require( 'chalk' );
let mkdirp = require( 'mkdirp' );
const sass = require( 'node-sass' );
const postcss = require( 'postcss' );

/**
 * Internal dependencies
 */
const getPackages = require( './get-packages' );
const getBabelConfig = require( './get-babel-config' );

/**
 * Module Constants
 */
const PACKAGES_DIR = path.resolve( __dirname, '../../packages' );
const SRC_DIR = 'src';
const BUILD_DIR = {
	main: 'build',
	module: 'build-module',
	style: 'build-style',
};
const DONE = chalk.reset.inverse.bold.green( ' DONE ' );

// Promisification
const readFile = promisify( fs.readFile );
const writeFile = promisify( fs.writeFile );
const exists = promisify( fs.exists );
const transformFile = promisify( babel.transformFile );
const renderSass = promisify( sass.render );
glob = promisify( glob );
mkdirp = promisify( mkdirp );

/**
 * Get the package name for a specified file
 *
 * @param  {string} file File name
 * @return {string}      Package name
 */
function getPackageName( file ) {
	return path.relative( PACKAGES_DIR, file ).split( path.sep )[ 0 ];
}

/**
 * Get Build Path for a specified file
 *
 * @param  {string} file        File to build
 * @param  {string} buildFolder Output folder
 * @return {string}             Build path
 */
function getBuildPath( file, buildFolder ) {
	const pkgName = getPackageName( file );
	const pkgSrcPath = path.resolve( PACKAGES_DIR, pkgName, SRC_DIR );
	const pkgBuildPath = path.resolve( PACKAGES_DIR, pkgName, buildFolder );
	const relativeToSrcPath = path.relative( pkgSrcPath, file );
	return path.resolve( pkgBuildPath, relativeToSrcPath );
}

/**
 * Build a file for the required environments (node and ES5)
 *
 * @param {string} file    File path to build
 * @param {boolean} silent Show logs
 *
 * @return {Promise} Promise resolving when file is built.
 */
function buildFile( file, silent ) {
	return Promise.all( [
		buildFileFor( file, silent, 'main' ),
		buildFileFor( file, silent, 'module' ),
	] );
}

async function buildStyle( packagePath ) {
	const styleFile = path.resolve( packagePath, SRC_DIR, 'style.scss' );
	const outputFile = path.resolve( packagePath, BUILD_DIR.style, 'style.css' );

	const contents = await readFile( styleFile, 'utf8' );
	const builtSass = await renderSass( {
		file: styleFile,
		includePaths: [ path.resolve( __dirname, '../../edit-post/assets/stylesheets' ) ],
		data: (
			[
				'colors',
				'breakpoints',
				'variables',
				'mixins',
				'animations',
				'z-index',
			].map( ( imported ) => `@import "${ imported }";` ).join( ' ' )	+
			contents
		),
	} );

	const result = postcss( require( './post-css-config' ) ).process( builtSass.css, {
		from: 'src/app.css',
		to: 'dest/app.css',
	} );

	await mkdirp( path.dirname( outputFile ) );

	return writeFile( outputFile, result.css );
}

/**
 * Build a file for a specific environment
 *
 * @param {string}  file        File path to build
 * @param {boolean} silent      Show logs
 * @param {string}  environment Dist environment (node or es5)
 */
async function buildFileFor( file, silent, environment ) {
	const buildDir = BUILD_DIR[ environment ];
	const destPath = getBuildPath( file, buildDir );
	const babelOptions = getBabelConfig( environment );

	const transformed = ( await transformFile( file, babelOptions ) ).code;

	await mkdirp( path.dirname( destPath ) );
	await writeFile( destPath, transformed );

	if ( ! silent ) {
		process.stdout.write(
			chalk.green( '  \u2022 ' ) +
				path.relative( PACKAGES_DIR, file ) +
				chalk.green( ' \u21D2 ' ) +
				path.relative( PACKAGES_DIR, destPath ) +
				'\n'
		);
	}
}

/**
 * Build the provided package path
 *
 * @param {string} packagePath absolute package path
 *
 * @return {Promise} Promise resolving when package is built.
 */
async function buildPackage( packagePath ) {
	const srcDir = path.resolve( packagePath, SRC_DIR );
	const files = await glob( `${ srcDir }/**/*.js`, {
		ignore: `${ srcDir }/**/test/**/*.js`,
		nodir: true,
	} );

	async function buildPackageStyleIfApplicable() {
		const styleFile = path.resolve( srcDir, 'style.scss' );
		if ( await exists( styleFile ) ) {
			return buildStyle( packagePath );
		}
	}

	return Promise.all( [
		...files.map( ( file ) => buildFile( file, true ) ),
		buildPackageStyleIfApplicable(),
	] ).then( () => {
		process.stdout.write( `${ path.basename( packagePath ) }\n` );
		process.stdout.write( `${ DONE }\n` );
	} );
}

const files = process.argv.slice( 2 );

if ( files.length ) {
	Promise.all( files.map( buildFile ) );
} else {
	process.stdout.write( chalk.inverse( '>> Building packages \n' ) );

	Promise.all( [
		getPackages().map( buildPackage ),
	] ).then( () => {
		process.stdout.write( '\n' );
	} );
}
