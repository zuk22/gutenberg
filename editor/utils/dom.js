/**
 * Check whether the selection touches an edge of the container
 *
 * @param  {Element} container       DOM Element
 * @param  {Boolean} start           Reverse means check if it touches the start of the container
 * @param  {Boolean} collapseRanges  Whether or not to collapse the selection range before the check
 * @return {Boolean}                 Is Edge or not
 */
export function isEdge( container, start = false, collapseRanges = false ) {
	if ( [ 'INPUT', 'TEXTAREA' ].indexOf( container.tagName ) !== -1 ) {
		if ( container.selectionStart !== container.selectionEnd ) {
			return false;
		}

		if ( start ) {
			return container.selectionStart === 0;
		}

		return container.value.length === container.selectionStart;
	}

	if ( ! container.isContentEditable ) {
		return true;
	}

	const selection = window.getSelection();
	const liveRange = selection.rangeCount ? selection.getRangeAt( 0 ) : null;
	const range = liveRange.cloneRange();
	if ( collapseRanges ) {
		range.collapse( start );
	}

	const position = start ? 'start' : 'end';
	const order = start ? 'first' : 'last';
	const offset = range[ `${ position }Offset` ];

	let node = range.startContainer;

	if ( ! range || ! range.collapsed ) {
		return false;
	}

	if ( start && offset !== 0 ) {
		return false;
	}

	if ( ! start && offset !== node.textContent.length ) {
		return false;
	}

	while ( node !== container ) {
		const parentNode = node.parentNode;

		if ( parentNode[ `${ order }Child` ] !== node ) {
			return false;
		}

		node = parentNode;
	}

	return true;
}

/**
 * Check whether there is a node above node (or node itself) that matches selector
 *
 * @param  {Element} node DOM Element
 * @param  {Boolean} selector  The selector to match
 * @return {Element}           A node if one is found matching the selector, otherwise null
 */
export function closest( node, selector ) {
	if ( node.matches( selector ) ) {
		return node;
	}

	if ( node.parentNode ) {
		return closest( node.parentNode, selector );
	}

	return null;
}

/**
 * Places the caret at start or end of a given element
 *
 * @param  {Element} container DOM Element
 * @param  {Boolean} start     Position: Start or end of the element
 */
export function placeCaretAtEdge( container, start = false ) {
	const isInputOrTextarea = [ 'INPUT', 'TEXTAREA' ].indexOf( container.tagName ) !== -1;

	// Inputs and Textareas
	if ( isInputOrTextarea ) {
		container.focus();
		if ( start ) {
			container.selectionStart = 0;
			container.selectionEnd = 0;
		} else {
			container.selectionStart = container.value.length;
			container.selectionEnd = container.value.length;
		}
		return;
	}

	// Content editables
	const range = document.createRange();
	range.selectNodeContents( container );
	range.collapse( start );
	const sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange( range );
	container.focus();
}

/**
 * Checks whether the user is on MacOS or not
 *
 * @return {Boolean}           Is Mac or Not
 */
export function isMac() {
	return window.navigator.platform.toLowerCase().indexOf( 'mac' ) !== -1;
}
