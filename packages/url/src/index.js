/**
 * External dependencies
 */
import { parse as parseURL, format as stringifyURL } from 'url';
import { parse, stringify } from 'qs';

const EMAIL_REGEXP = /^(mailto:)?[a-z0-9._%+-]+@[a-z0-9][a-z0-9.-]*\.[a-z]{2,63}$/i;
const USABLE_HREF_REGEXP = /^(?:[a-z]+:|#|\?|\.|\/)/i;

/**
 * Appends arguments to the query string of the url
 *
 * @param  {string} url   URL
 * @param  {Object} args  Query Args
 *
 * @return {string}       Updated URL
 */
export function addQueryArgs( url, args ) {
	const parsedURL = parseURL( url );
	const query = { ...parse( parsedURL.query ), ...args };

	return stringifyURL( { ...parsedURL, search: stringify( query ) } );
}

/**
 * Prepends "http://" to a url, if it looks like something that is meant to be a TLD.
 *
 * @param  {string} url The URL to test
 *
 * @return {string}     The updated URL
 */
export function prependHTTP( url ) {
	if ( ! USABLE_HREF_REGEXP.test( url ) && ! EMAIL_REGEXP.test( url ) ) {
		return 'http://' + url;
	}

	return url;
}
