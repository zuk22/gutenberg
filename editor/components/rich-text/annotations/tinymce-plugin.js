/* Ephox Annotations plugin
*
* Copyright 2010-2018 Ephox Corporation.  All rights reserved.
*
* Version: 1.0.0
*/
!function ( modules ) {
	function loader( moduleIndex ) {
		if ( c[ moduleIndex ] ) {
			return c[ moduleIndex ].exports
		}

		var e = c[ moduleIndex ] = { i: moduleIndex, l: !1, exports: {} };

		return modules[ moduleIndex ].call( e.exports, e, e.exports, loader ), e.l = !0, e.exports
	}

	var c = {};
	loader.m = modules, loader.c = c, loader.d = function ( a, c, d ) {
		loader.o( a, c ) || Object.defineProperty( a, c, {
			configurable: !1,
			enumerable: !0,
			get: d
		} )
	}, loader.n = function ( a ) {
		var c = a && a.__esModule ? function () {
			return a.default
		} : function () {
			return a
		};
		return loader.d( c, "a", c ), c
	}, loader.o = function ( a, b ) {
		return Object.prototype.hasOwnProperty.call( a, b )
	}, loader.p = "", loader( loader.s = 68 )
}( [ function ( a, b, c ) {
	"use strict";
	var d = c( 25 ), e = c( 7 ), f = c( 43 ), g = (c( 70 ), c( 12 )),
		h = c( 26 ), i = (c( 72 ), c( 73 ), c( 47 ), c( 74 ), c( 75 ), c( 27 )),
		j = (c( 76 ), c( 77 ), c( 78 ), c( 17 )), k = c( 8 ), l = c( 79 ),
		m = c( 80 ), n = c( 45 ), o = (c( 81 ), c( 82 ), c( 83 ), c( 84 )),
		p = c( 87 ), q = c( 90 ), r = c( 91 ), s = c( 13 );
	c( 92 ), c( 93 ), c( 94 );
	c.d( b, "a", function () {
		return d.a
	} ), c.d( b, "b", function () {
		return e
	} ), c.d( b, "c", function () {
		return f.a
	} ), c.d( b, "d", function () {
		return g
	} ), c.d( b, "e", function () {
		return h.a
	} ), c.d( b, "f", function () {
		return i.a
	} ), c.d( b, "g", function () {
		return j
	} ), c.d( b, "h", function () {
		return k.a
	} ), c.d( b, "i", function () {
		return l
	} ), c.d( b, "j", function () {
		return m
	} ), c.d( b, "k", function () {
		return n.a
	} ), c.d( b, "l", function () {
		return o
	} ), c.d( b, "m", function () {
		return p
	} ), c.d( b, "n", function () {
		return q
	} ), c.d( b, "o", function () {
		return r
	} ), c.d( b, "p", function () {
		return s
	} )
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 2 ), f = function ( a, b ) {
		var c = b || e.g, d = c.createElement( "div" );
		if ( d.innerHTML = a, !d.hasChildNodes() || d.childNodes.length > 1 ) throw e.f.error( "HTML does not have a single root node", a ), "HTML must have a single root node";
		return i( d.childNodes[ 0 ] )
	}, g = function ( a, b ) {
		var c = b || e.g, d = c.createElement( a );
		return i( d )
	}, h = function ( a, b ) {
		var c = b || e.g, d = c.createTextNode( a );
		return i( d )
	}, i = function ( a ) {
		if ( null === a || void 0 === a ) throw new Error( "Node cannot be null or undefined" );
		return { dom: d.d.constant( a ) }
	}, j = function ( a, b, c ) {
		var e = a.dom();
		return d.h.from( e.elementFromPoint( b, c ) ).map( i )
	}, k = { fromHtml: f, fromTag: g, fromText: h, fromDom: i, fromPoint: j };
	b.a = k
}, function ( a, b, c ) {
	"use strict";
	c.d( b, "a", function () {
		return MutationObserver
	} ), c.d( b, "b", function () {
		return Node
	} ), c.d( b, "c", function () {
		return Window
	} ), c.d( b, "g", function () {
		return document
	} ), c.d( b, "j", function () {
		return window
	} ), c.d( b, "d", function () {
		return clearInterval
	} ), c.d( b, "e", function () {
		return clearTimeout
	} ), c.d( b, "h", function () {
		return setInterval
	} ), c.d( b, "i", function () {
		return setTimeout
	} ), c.d( b, "f", function () {
		return console
	} )
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 117 ), f = c( 4 ), g = c( 1 ), h = function ( a ) {
		return g.a.fromDom( a.dom().ownerDocument )
	}, i = function ( a ) {
		return g.a.fromDom( a.dom().ownerDocument.documentElement )
	}, j = function ( a ) {
		var b = a.dom(), c = b.ownerDocument.defaultView;
		return g.a.fromDom( c )
	}, k = function ( a ) {
		var b = a.dom();
		return d.h.from( b.parentNode ).map( g.a.fromDom )
	}, l = function ( a ) {
		return k( a ).bind( function ( b ) {
			var c = t( b );
			return d.b.findIndex( c, function ( b ) {
				return f.a.eq( a, b )
			} )
		} )
	}, m = function ( a, b ) {
		for ( var c = d.p.isFunction( b ) ? b : d.d.constant( !1 ), e = a.dom(), f = []; null !== e.parentNode && void 0 !== e.parentNode; ) {
			var h = e.parentNode, i = g.a.fromDom( h );
			if ( f.push( i ), !0 === c( i ) ) break;
			e = h
		}
		return f
	}, n = function ( a ) {
		var b = function ( b ) {
			return d.b.filter( b, function ( b ) {
				return !f.a.eq( a, b )
			} )
		};
		return k( a ).map( t ).map( b ).getOr( [] )
	}, o = function ( a ) {
		var b = a.dom();
		return d.h.from( b.offsetParent ).map( g.a.fromDom )
	}, p = function ( a ) {
		var b = a.dom();
		return d.h.from( b.previousSibling ).map( g.a.fromDom )
	}, q = function ( a ) {
		var b = a.dom();
		return d.h.from( b.nextSibling ).map( g.a.fromDom )
	}, r = function ( a ) {
		return d.b.reverse( e.a.toArray( a, p ) )
	}, s = function ( a ) {
		return e.a.toArray( a, q )
	}, t = function ( a ) {
		var b = a.dom();
		return d.b.map( b.childNodes, g.a.fromDom )
	}, u = function ( a, b ) {
		var c = a.dom().childNodes;
		return d.h.from( c[ b ] ).map( g.a.fromDom )
	}, v = function ( a ) {
		return u( a, 0 )
	}, w = function ( a ) {
		return u( a, a.dom().childNodes.length - 1 )
	}, x = function ( a ) {
		return a.dom().childNodes.length
	}, y = function ( a ) {
		return a.dom().hasChildNodes()
	}, z = d.m.immutable( "element", "offset" ), A = function ( a, b ) {
		var c = t( a );
		return c.length > 0 && b < c.length ? z( c[ b ], 0 ) : z( a, b )
	};
	b.a = {
		owner: h,
		defaultView: j,
		documentElement: i,
		parent: k,
		findIndex: l,
		parents: m,
		siblings: n,
		prevSibling: p,
		offsetParent: o,
		prevSiblings: r,
		nextSibling: q,
		nextSiblings: s,
		children: t,
		child: u,
		firstChild: v,
		lastChild: w,
		childNodesCount: x,
		hasChildNodes: y,
		leaf: A
	}
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 9 ), f = c( 18 ), g = function ( a, b ) {
		return a.dom() === b.dom()
	}, h = function ( a, b ) {
		return a.dom().isEqualNode( b.dom() )
	}, i = function ( a, b ) {
		return d.b.exists( b, d.d.curry( g, a ) )
	}, j = function ( a, b ) {
		var c = a.dom(), d = b.dom();
		return c !== d && c.contains( d )
	}, k = function ( a, b ) {
		return e.a.documentPositionContainedBy( a.dom(), b.dom() )
	}, l = e.c.detect().browser, m = l.isIE() ? k : j;
	b.a = { eq: g, isEqualNode: h, member: i, contains: m, is: f.a.is }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = function ( a, b ) {
		return d.j.resolve( a, b )
	}, f = function ( a, b ) {
		var c = e( a, b );
		if ( void 0 === c || null === c ) throw a + " not available on this browser";
		return c
	};
	b.a = { getOrDie: f }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 29 ), e = function ( a ) {
		return a.dom().nodeName.toLowerCase()
	}, f = function ( a ) {
		return a.dom().nodeType
	}, g = function ( a ) {
		return a.dom().nodeValue
	}, h = function ( a ) {
		return function ( b ) {
			return f( b ) === a
		}
	}, i = function ( a ) {
		return f( a ) === d.a.COMMENT || "#comment" === e( a )
	}, j = h( d.a.ELEMENT ), k = h( d.a.TEXT ), l = h( d.a.DOCUMENT );
	b.a = {
		name: e,
		type: f,
		value: g,
		isElement: j,
		isText: k,
		isDocument: l,
		isComment: i
	}
}, function ( a, b, c ) {
	"use strict";
	Object.defineProperty( b, "__esModule", { value: !0 } ), c.d( b, "indexOf", function () {
		return g
	} ), c.d( b, "contains", function () {
		return h
	} ), c.d( b, "exists", function () {
		return i
	} ), c.d( b, "range", function () {
		return j
	} ), c.d( b, "chunk", function () {
		return k
	} ), c.d( b, "map", function () {
		return l
	} ), c.d( b, "each", function () {
		return m
	} ), c.d( b, "eachr", function () {
		return n
	} ), c.d( b, "partition", function () {
		return o
	} ), c.d( b, "filter", function () {
		return p
	} ), c.d( b, "groupBy", function () {
		return q
	} ), c.d( b, "foldr", function () {
		return r
	} ), c.d( b, "foldl", function () {
		return s
	} ), c.d( b, "find", function () {
		return t
	} ), c.d( b, "findIndex", function () {
		return u
	} ), c.d( b, "flatten", function () {
		return x
	} ), c.d( b, "bind", function () {
		return y
	} ), c.d( b, "forall", function () {
		return z
	} ), c.d( b, "equal", function () {
		return A
	} ), c.d( b, "reverse", function () {
		return C
	} ), c.d( b, "difference", function () {
		return D
	} ), c.d( b, "mapToObject", function () {
		return E
	} ), c.d( b, "pure", function () {
		return F
	} ), c.d( b, "sort", function () {
		return G
	} ), c.d( b, "head", function () {
		return H
	} ), c.d( b, "last", function () {
		return I
	} ), c.d( b, "from", function () {
		return J
	} );
	var d = c( 8 ), e = c( 13 ), f = function () {
		var a = Array.prototype.indexOf, b = function ( b, c ) {
			return a.call( b, c )
		}, c = function ( a, b ) {
			return v( a, b )
		};
		return void 0 === a ? c : b
	}(), g = function ( a, b ) {
		var c = f( a, b );
		return -1 === c ? d.a.none() : d.a.some( c )
	}, h = function ( a, b ) {
		return f( a, b ) > -1
	}, i = function ( a, b ) {
		return u( a, b ).isSome()
	}, j = function ( a, b ) {
		for ( var c = [], d = 0; d < a; d++ ) c.push( b( d ) );
		return c
	}, k = function ( a, b ) {
		for ( var c = [], d = 0; d < a.length; d += b ) {
			var e = a.slice( d, d + b );
			c.push( e )
		}
		return c
	}, l = function ( a, b ) {
		for ( var c = a.length, d = new Array( c ), e = 0; e < c; e++ ) {
			var f = a[ e ];
			d[ e ] = b( f, e, a )
		}
		return d
	}, m = function ( a, b ) {
		for ( var c = 0, d = a.length; c < d; c++ ) {
			b( a[ c ], c, a )
		}
	}, n = function ( a, b ) {
		for ( var c = a.length - 1; c >= 0; c-- ) {
			b( a[ c ], c, a )
		}
	}, o = function ( a, b ) {
		for ( var c = [], d = [], e = 0, f = a.length; e < f; e++ ) {
			var g = a[ e ];
			(b( g, e, a ) ? c : d).push( g )
		}
		return { pass: c, fail: d }
	}, p = function ( a, b ) {
		for ( var c = [], d = 0, e = a.length; d < e; d++ ) {
			var f = a[ d ];
			b( f, d, a ) && c.push( f )
		}
		return c
	}, q = function ( a, b ) {
		if ( 0 === a.length ) return [];
		for ( var c = b( a[ 0 ] ), d = [], e = [], f = 0, g = a.length; f < g; f++ ) {
			var h = a[ f ], i = b( h );
			i !== c && (d.push( e ), e = []), c = i, e.push( h )
		}
		return 0 !== e.length && d.push( e ), d
	}, r = function ( a, b, c ) {
		return n( a, function ( a ) {
			c = b( c, a )
		} ), c
	}, s = function ( a, b, c ) {
		return m( a, function ( a ) {
			c = b( c, a )
		} ), c
	}, t = function ( a, b ) {
		for ( var c = 0, e = a.length; c < e; c++ ) {
			var f = a[ c ];
			if ( b( f, c, a ) ) return d.a.some( f )
		}
		return d.a.none()
	}, u = function ( a, b ) {
		for ( var c = 0, e = a.length; c < e; c++ ) {
			if ( b( a[ c ], c, a ) ) return d.a.some( c )
		}
		return d.a.none()
	}, v = function ( a, b ) {
		for ( var c = 0, d = a.length; c < d; ++c ) if ( a[ c ] === b ) return c;
		return -1
	}, w = Array.prototype.push, x = function ( a ) {
		for ( var b = [], c = 0, d = a.length; c < d; ++c ) {
			if ( !Array.prototype.isPrototypeOf( a[ c ] ) ) throw new Error( "Arr.flatten item " + c + " was not an array, input: " + a );
			w.apply( b, a[ c ] )
		}
		return b
	}, y = function ( a, b ) {
		var c = l( a, b );
		return x( c )
	}, z = function ( a, b ) {
		for ( var c = 0, d = a.length; c < d; ++c ) {
			if ( !0 !== b( a[ c ], c, a ) ) return !1
		}
		return !0
	}, A = function ( a, b ) {
		return a.length === b.length && z( a, function ( a, c ) {
			return a === b[ c ]
		} )
	}, B = Array.prototype.slice, C = function ( a ) {
		var b = B.call( a, 0 );
		return b.reverse(), b
	}, D = function ( a, b ) {
		return p( a, function ( a ) {
			return !h( b, a )
		} )
	}, E = function ( a, b ) {
		for ( var c = {}, d = 0, e = a.length; d < e; d++ ) {
			var f = a[ d ];
			c[ String( f ) ] = b( f, d )
		}
		return c
	}, F = function ( a ) {
		return [ a ]
	}, G = function ( a, b ) {
		var c = B.call( a, 0 );
		return c.sort( b ), c
	}, H = function ( a ) {
		return 0 === a.length ? d.a.none() : d.a.some( a[ 0 ] )
	}, I = function ( a ) {
		return 0 === a.length ? d.a.none() : d.a.some( a[ a.length - 1 ] )
	}, J = e.isFunction( Array.from ) ? Array.from : function ( a ) {
		return B.call( a )
	}
}, function ( a, b, c ) {
	"use strict";
	c.d( b, "a", function () {
		return k
	} );
	var d = c( 12 ), e = d.never, f = d.always, g = function () {
		return h
	}, h = function () {
		var a = function ( a ) {
			return a.isNone()
		}, b = function ( a ) {
			return a()
		}, c = function ( a ) {
			return a
		}, h = function () {
		}, i = function () {
			return null
		}, j = function () {
		}, k = {
			fold: function ( a, b ) {
				return a()
			},
			is: e,
			isSome: e,
			isNone: f,
			getOr: c,
			getOrThunk: b,
			getOrDie: function ( a ) {
				throw new Error( a || "error: getOrDie called on none." )
			},
			getOrNull: i,
			getOrUndefined: j,
			or: c,
			orThunk: b,
			map: g,
			ap: g,
			each: h,
			bind: g,
			flatten: g,
			exists: e,
			forall: f,
			filter: g,
			equals: a,
			equals_: a,
			toArray: function () {
				return []
			},
			toString: d.constant( "none()" )
		};
		return Object.freeze && Object.freeze( k ), k
	}(), i = function ( a ) {
		var b = function () {
			return a
		}, c = function () {
			return k
		}, d = function ( b ) {
			return i( b( a ) )
		}, j = function ( b ) {
			return b( a )
		}, k = {
			fold: function ( b, c ) {
				return c( a )
			},
			is: function ( b ) {
				return a === b
			},
			isSome: f,
			isNone: e,
			getOr: b,
			getOrThunk: b,
			getOrDie: b,
			getOrNull: b,
			getOrUndefined: b,
			or: c,
			orThunk: c,
			map: d,
			ap: function ( b ) {
				return b.fold( g, function ( b ) {
					return i( b( a ) )
				} )
			},
			each: function ( b ) {
				b( a )
			},
			bind: j,
			flatten: b,
			exists: j,
			forall: j,
			filter: function ( b ) {
				return b( a ) ? k : h
			},
			equals: function ( b ) {
				return b.is( a )
			},
			equals_: function ( b, c ) {
				return b.fold( e, function ( b ) {
					return c( a, b )
				} )
			},
			toArray: function () {
				return [ a ]
			},
			toString: function () {
				return "some(" + a + ")"
			}
		};
		return k
	}, j = function ( a ) {
		return null === a || void 0 === a ? h : i( a )
	}, k = { some: i, none: g, from: j }
}, function ( a, b, c ) {
	"use strict";
	var d = (c( 96 ), c( 97 ), c( 98 ), c( 99 ), c( 100 ), c( 101 ), c( 102 )),
		e = c( 103 ), f = c( 104 ),
		g = (c( 111 ), c( 112 ), c( 113 ), c( 114 ));
	c( 115 ), c( 116 );
	c.d( b, "a", function () {
		return d.a
	} ), c.d( b, "b", function () {
		return e.a
	} ), c.d( b, "c", function () {
		return f.a
	} ), c.d( b, "d", function () {
		return g.a
	} )
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 11 ), f = c( 15 ), g = c( 1 ), h = c( 6 ),
		i = c( 33 ), j = c( 2 ), k = function ( a, b, c ) {
			if ( !d.p.isString( c ) ) throw j.f.error( "Invalid call to CSS.set. Property ", b, ":: Value ", c, ":: Element ", a ), new Error( "CSS value must be a string: " + c );
			i.a.isSupported( a ) && a.style.setProperty( b, c )
		}, l = function ( a, b ) {
			i.a.isSupported( a ) && a.style.removeProperty( b )
		}, m = function ( a, b, c ) {
			var d = a.dom();
			k( d, b, c )
		}, n = function ( a, b ) {
			var c = a.dom();
			d.g.each( b, function ( a, b ) {
				k( c, b, a )
			} )
		}, o = function ( a, b ) {
			var c = a.dom();
			d.g.each( b, function ( a, b ) {
				a.fold( function () {
					l( c, b )
				}, function ( a ) {
					k( c, b, a )
				} )
			} )
		}, p = function ( a, b ) {
			var c = a.dom(), d = j.j.getComputedStyle( c ),
				e = d.getPropertyValue( b ),
				g = "" !== e || f.a.inBody( a ) ? e : q( c, b );
			return null === g ? void 0 : g
		}, q = function ( a, b ) {
			return i.a.isSupported( a ) ? a.style.getPropertyValue( b ) : ""
		}, r = function ( a, b ) {
			var c = a.dom(), e = q( c, b );
			return d.h.from( e ).filter( function ( a ) {
				return a.length > 0
			} )
		}, s = function ( a ) {
			var b = {}, c = a.dom();
			if ( i.a.isSupported( c ) ) for ( var d = 0; d < c.style.length; d++ ) {
				var e = c.style.item( d );
				b[ e ] = c.style[ e ]
			}
			return b
		}, t = function ( a, b, c ) {
			var d = g.a.fromTag( a );
			return m( d, b, c ), r( d, b ).isSome()
		}, u = function ( a, b ) {
			var c = a.dom();
			l( c, b ), e.a.has( a, "style" ) && "" === d.l.trim( e.a.get( a, "style" ) ) && e.a.remove( a, "style" )
		}, v = function ( a, b ) {
			var c = e.a.get( a, "style" ), d = b( a );
			return (void 0 === c ? e.a.remove : e.a.set)( a, "style", c ), d
		}, w = function ( a, b ) {
			var c = a.dom(), d = b.dom();
			i.a.isSupported( c ) && i.a.isSupported( d ) && (d.style.cssText = c.style.cssText)
		}, x = function ( a ) {
			return a.dom().offsetWidth
		}, y = function ( a, b, c ) {
			r( a, c ).each( function ( a ) {
				r( b, c ).isNone() && m( b, c, a )
			} )
		}, z = function ( a, b, c ) {
			h.a.isElement( a ) && h.a.isElement( b ) && d.b.each( c, function ( c ) {
				y( a, b, c )
			} )
		};
	b.a = {
		copy: w,
		set: m,
		preserve: v,
		setAll: n,
		setOptions: o,
		remove: u,
		get: p,
		getRaw: r,
		getAllRaw: s,
		isValidValue: t,
		reflow: x,
		transfer: z
	}
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 6 ), f = c( 2 ), g = function ( a, b, c ) {
		if ( !(d.p.isString( c ) || d.p.isBoolean( c ) || d.p.isNumber( c )) ) throw f.f.error( "Invalid call to Attr.set. Key ", b, ":: Value ", c, ":: Element ", a ), new Error( "Attribute value was not simple" );
		a.setAttribute( b, c + "" )
	}, h = function ( a, b, c ) {
		g( a.dom(), b, c )
	}, i = function ( a, b ) {
		var c = a.dom();
		d.g.each( b, function ( a, b ) {
			g( c, b, a )
		} )
	}, j = function ( a, b ) {
		var c = a.dom().getAttribute( b );
		return null === c ? void 0 : c
	}, k = function ( a, b ) {
		var c = a.dom();
		return !(!c || !c.hasAttribute) && c.hasAttribute( b )
	}, l = function ( a, b ) {
		a.dom().removeAttribute( b )
	}, m = function ( a ) {
		var b = a.dom().attributes;
		return void 0 === b || null === b || 0 === b.length
	}, n = function ( a ) {
		return d.b.foldl( a.dom().attributes, function ( a, b ) {
			return a[ b.name ] = b.value, a
		}, {} )
	}, o = function ( a, b, c ) {
		k( a, c ) && !k( b, c ) && h( b, c, j( a, c ) )
	}, p = function ( a, b, c ) {
		e.a.isElement( a ) && e.a.isElement( b ) && d.b.each( c, function ( c ) {
			o( a, b, c )
		} )
	};
	b.a = {
		clone: n,
		set: h,
		setAll: i,
		get: j,
		has: k,
		remove: l,
		hasNone: m,
		transfer: p
	}
}, function ( a, b, c ) {
	"use strict";
	Object.defineProperty( b, "__esModule", { value: !0 } ), c.d( b, "noop", function () {
		return d
	} ), c.d( b, "noarg", function () {
		return e
	} ), c.d( b, "compose", function () {
		return f
	} ), c.d( b, "constant", function () {
		return g
	} ), c.d( b, "identity", function () {
		return h
	} ), c.d( b, "tripleEquals", function () {
		return i
	} ), c.d( b, "curry", function () {
		return j
	} ), c.d( b, "not", function () {
		return k
	} ), c.d( b, "die", function () {
		return l
	} ), c.d( b, "apply", function () {
		return m
	} ), c.d( b, "call", function () {
		return n
	} ), c.d( b, "never", function () {
		return o
	} ), c.d( b, "always", function () {
		return p
	} );
	var d = function () {
		for ( var a = [], b = 0; b < arguments.length; b++ ) a[ b ] = arguments[ b ]
	}, e = function ( a ) {
		return function () {
			for ( var b = [], c = 0; c < arguments.length; c++ ) b[ c ] = arguments[ c ];
			return a()
		}
	}, f = function ( a, b ) {
		return function () {
			for ( var c = [], d = 0; d < arguments.length; d++ ) c[ d ] = arguments[ d ];
			return a( b.apply( null, arguments ) )
		}
	}, g = function ( a ) {
		return function () {
			return a
		}
	}, h = function ( a ) {
		return a
	}, i = function ( a, b ) {
		return a === b
	}, j = function ( a ) {
		for ( var b = [], c = 1; c < arguments.length; c++ ) b[ c - 1 ] = arguments[ c ];
		for ( var d = new Array( arguments.length - 1 ), e = 1; e < arguments.length; e++ ) d[ e - 1 ] = arguments[ e ];
		return function () {
			for ( var b = [], c = 0; c < arguments.length; c++ ) b[ c ] = arguments[ c ];
			for ( var e = new Array( arguments.length ), f = 0; f < e.length; f++ ) e[ f ] = arguments[ f ];
			var g = d.concat( e );
			return a.apply( null, g )
		}
	}, k = function ( a ) {
		return function () {
			for ( var b = [], c = 0; c < arguments.length; c++ ) b[ c ] = arguments[ c ];
			return !a.apply( null, arguments )
		}
	}, l = function ( a ) {
		return function () {
			throw new Error( a )
		}
	}, m = function ( a ) {
		return a()
	}, n = function ( a ) {
		a()
	}, o = g( !1 ), p = g( !0 )
}, function ( a, b, c ) {
	"use strict";
	Object.defineProperty( b, "__esModule", { value: !0 } ), c.d( b, "isString", function () {
		return f
	} ), c.d( b, "isObject", function () {
		return g
	} ), c.d( b, "isArray", function () {
		return h
	} ), c.d( b, "isNull", function () {
		return i
	} ), c.d( b, "isBoolean", function () {
		return j
	} ), c.d( b, "isUndefined", function () {
		return k
	} ), c.d( b, "isFunction", function () {
		return l
	} ), c.d( b, "isNumber", function () {
		return m
	} );
	var d = function ( a ) {
			if ( null === a ) return "null";
			var b = typeof a;
			return "object" === b && Array.prototype.isPrototypeOf( a ) ? "array" : "object" === b && String.prototype.isPrototypeOf( a ) ? "string" : b
		}, e = function ( a ) {
			return function ( b ) {
				return d( b ) === a
			}
		}, f = e( "string" ), g = e( "object" ), h = e( "array" ), i = e( "null" ),
		j = e( "boolean" ), k = e( "undefined" ), l = e( "function" ),
		m = e( "number" )
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 15 ), f = c( 4 ), g = c( 1 ), h = c( 50 ),
		i = function ( a ) {
			return n( e.a.body(), a )
		}, j = function ( a, b, c ) {
			for ( var e = a.dom(), f = d.p.isFunction( c ) ? c : d.d.constant( !1 ); e.parentNode; ) {
				e = e.parentNode;
				var h = g.a.fromDom( e );
				if ( b( h ) ) return d.h.some( h );
				if ( f( h ) ) break
			}
			return d.h.none()
		}, k = function ( a, b, c ) {
			var d = function ( a ) {
				return b( a )
			};
			return Object( h.a )( d, j, a, b, c )
		}, l = function ( a, b ) {
			var c = a.dom();
			return c.parentNode ? m( g.a.fromDom( c.parentNode ), function ( c ) {
				return !f.a.eq( a, c ) && b( c )
			} ) : d.h.none()
		}, m = function ( a, b ) {
			return d.b.find( a.dom().childNodes, d.d.compose( b, g.a.fromDom ) ).map( g.a.fromDom )
		}, n = function ( a, b ) {
			var c = function ( a ) {
				for ( var e = 0; e < a.childNodes.length; e++ ) {
					if ( b( g.a.fromDom( a.childNodes[ e ] ) ) ) return d.h.some( g.a.fromDom( a.childNodes[ e ] ) );
					var f = c( a.childNodes[ e ] );
					if ( f.isSome() ) return f
				}
				return d.h.none()
			};
			return c( a.dom() )
		};
	b.a = {
		first: i,
		ancestor: j,
		closest: k,
		sibling: l,
		child: m,
		descendant: n
	}
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 1 ), f = c( 6 ), g = c( 2 ), h = function ( a ) {
		var b = f.a.isText( a ) ? a.dom().parentNode : a.dom();
		return void 0 !== b && null !== b && b.ownerDocument.body.contains( b )
	}, i = d.o.cached( function () {
		return j( e.a.fromDom( g.g ) )
	} ), j = function ( a ) {
		var b = a.dom().body;
		if ( null === b || void 0 === b ) throw"Body is not available yet";
		return e.a.fromDom( b )
	};
	b.a = { body: i, getBody: j, inBody: h }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 3 ), e = function ( a, b ) {
		d.a.parent( a ).each( function ( c ) {
			c.dom().insertBefore( b.dom(), a.dom() )
		} )
	}, f = function ( a, b ) {
		d.a.nextSibling( a ).fold( function () {
			d.a.parent( a ).each( function ( a ) {
				h( a, b )
			} )
		}, function ( a ) {
			e( a, b )
		} )
	}, g = function ( a, b ) {
		d.a.firstChild( a ).fold( function () {
			h( a, b )
		}, function ( c ) {
			a.dom().insertBefore( b.dom(), c.dom() )
		} )
	}, h = function ( a, b ) {
		a.dom().appendChild( b.dom() )
	}, i = function ( a, b, c ) {
		d.a.child( a, c ).fold( function () {
			h( a, b )
		}, function ( a ) {
			e( a, b )
		} )
	}, j = function ( a, b ) {
		e( a, b ), h( b, a )
	};
	b.a = { before: e, after: f, prepend: g, append: h, appendAt: i, wrap: j }
}, function ( a, b, c ) {
	"use strict";
	Object.defineProperty( b, "__esModule", { value: !0 } ), c.d( b, "keys", function () {
		return e
	} ), c.d( b, "each", function () {
		return f
	} ), c.d( b, "map", function () {
		return g
	} ), c.d( b, "tupleMap", function () {
		return h
	} ), c.d( b, "bifilter", function () {
		return i
	} ), c.d( b, "mapToArray", function () {
		return j
	} ), c.d( b, "find", function () {
		return k
	} ), c.d( b, "values", function () {
		return l
	} ), c.d( b, "size", function () {
		return m
	} );
	var d = c( 8 ), e = function () {
		var a = Object.keys, b = function ( a ) {
			var b = [];
			for ( var c in a ) a.hasOwnProperty( c ) && b.push( c );
			return b
		};
		return void 0 === a ? b : a
	}(), f = function ( a, b ) {
		for ( var c = e( a ), d = 0, f = c.length; d < f; d++ ) {
			var g = c[ d ];
			b( a[ g ], g, a )
		}
	}, g = function ( a, b ) {
		return h( a, function ( a, c, d ) {
			return { k: c, v: b( a, c, d ) }
		} )
	}, h = function ( a, b ) {
		var c = {};
		return f( a, function ( d, e ) {
			var f = b( d, e, a );
			c[ f.k ] = f.v
		} ), c
	}, i = function ( a, b ) {
		var c = {}, d = {};
		return f( a, function ( a, e ) {
			(b( a, e ) ? c : d)[ e ] = a
		} ), { t: c, f: d }
	}, j = function ( a, b ) {
		var c = [];
		return f( a, function ( a, d ) {
			c.push( b( a, d ) )
		} ), c
	}, k = function ( a, b ) {
		for ( var c = e( a ), f = 0, g = c.length; f < g; f++ ) {
			var h = c[ f ], i = a[ h ];
			if ( b( i, h, a ) ) return d.a.some( i )
		}
		return d.a.none()
	}, l = function ( a ) {
		return j( a, function ( a ) {
			return a
		} )
	}, m = function ( a ) {
		return e( a ).length
	}
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 1 ), f = c( 29 ), g = c( 2 ), h = f.a.ELEMENT,
		i = f.a.DOCUMENT, j = function ( a, b ) {
			var c = a.dom();
			if ( c.nodeType !== h ) return !1;
			if ( void 0 !== c.matches ) return c.matches( b );
			if ( void 0 !== c.msMatchesSelector ) return c.msMatchesSelector( b );
			if ( void 0 !== c.webkitMatchesSelector ) return c.webkitMatchesSelector( b );
			if ( void 0 !== c.mozMatchesSelector ) return c.mozMatchesSelector( b );
			throw new Error( "Browser lacks native selectors" )
		}, k = function ( a ) {
			return a.nodeType !== h && a.nodeType !== i || 0 === a.childElementCount
		}, l = function ( a, b ) {
			var c = void 0 === b ? g.g : b.dom();
			return k( c ) ? [] : d.b.map( c.querySelectorAll( a ), e.a.fromDom )
		}, m = function ( a, b ) {
			var c = void 0 === b ? g.g : b.dom();
			return k( c ) ? d.h.none() : d.h.from( c.querySelector( a ) ).map( e.a.fromDom )
		};
	b.a = { all: l, is: j, one: m }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 51 ), f = d.d.constant( !0 ),
		g = function ( a, b, c ) {
			return e.a.bind( a, b, f, c )
		}, h = function ( a, b, c ) {
			return e.a.capture( a, b, f, c )
		};
	b.a = { bind: g, capture: h }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 16 ), f = function ( a, b ) {
		d.b.each( b, function ( b ) {
			e.a.before( a, b )
		} )
	}, g = function ( a, b ) {
		d.b.each( b, function ( c, d ) {
			var f = 0 === d ? a : b[ d - 1 ];
			e.a.after( f, c )
		} )
	}, h = function ( a, b ) {
		d.b.each( b.slice().reverse(), function ( b ) {
			e.a.prepend( a, b )
		} )
	}, i = function ( a, b ) {
		d.b.each( b, function ( b ) {
			e.a.append( a, b )
		} )
	};
	b.a = { before: f, after: g, prepend: h, append: i }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 20 ), f = c( 3 ), g = function ( a ) {
		a.dom().textContent = "", d.b.each( f.a.children( a ), function ( a ) {
			h( a )
		} )
	}, h = function ( a ) {
		var b = a.dom();
		null !== b.parentNode && b.parentNode.removeChild( b )
	}, i = function ( a ) {
		var b = f.a.children( a );
		b.length > 0 && e.a.before( a, b ), h( a )
	};
	b.a = { empty: g, remove: h, unwrap: i }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 14 ), e = c( 18 ), f = c( 50 ), g = function ( a ) {
		return e.a.one( a )
	}, h = function ( a, b, c ) {
		return d.a.ancestor( a, function ( a ) {
			return e.a.is( a, b )
		}, c )
	}, i = function ( a, b ) {
		return d.a.sibling( a, function ( a ) {
			return e.a.is( a, b )
		} )
	}, j = function ( a, b ) {
		return d.a.child( a, function ( a ) {
			return e.a.is( a, b )
		} )
	}, k = function ( a, b ) {
		return e.a.one( b, a )
	}, l = function ( a, b, c ) {
		return Object( f.a )( e.a.is, h, a, b, c )
	};
	b.a = {
		first: g,
		ancestor: h,
		sibling: i,
		child: j,
		descendant: k,
		closest: l
	}
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 1 ), f = c( 3 ), g = c( 40 ),
		h = d.a.generate( [ { domRange: [ "rng" ] }, { relative: [ "startSitu", "finishSitu" ] }, { exact: [ "start", "soffset", "finish", "foffset" ] } ] ),
		i = d.m.immutable( "start", "soffset", "finish", "foffset" ),
		j = function ( a ) {
			return h.exact( a.start(), a.soffset(), a.finish(), a.foffset() )
		}, k = function ( a ) {
			return a.match( {
				domRange: function ( a ) {
					return e.a.fromDom( a.startContainer )
				}, relative: function ( a, b ) {
					return g.a.getStart( a )
				}, exact: function ( a, b, c, d ) {
					return a
				}
			} )
		}, l = function ( a ) {
			var b = k( a );
			return f.a.defaultView( b )
		};
	b.a = {
		domRange: h.domRange,
		relative: h.relative,
		exact: h.exact,
		exactFromRange: j,
		range: i,
		getWin: l
	}
}, function ( a, b, c ) {
	"use strict";
	c.d( b, "e", function () {
		return d
	} ), c.d( b, "c", function () {
		return e
	} ), c.d( b, "b", function () {
		return f
	} ), c.d( b, "f", function () {
		return g
	} ), c.d( b, "d", function () {
		return h
	} ), c.d( b, "a", function () {
		return i
	} );
	var d = function () {
		return "wp-annotation"
	}, e = function () {
		return "wp.add-annotation"
	}, f = function () {
		return "wp-annotation-marker"
	}, g = function () {
		return "wp.no-annotation-selected"
	}, h = function () {
		return "wp.annotation-selected"
	}, i = function () {
		return "wp.annotation-moved"
	}
}, function ( a, b, c ) {
	"use strict";
	c.d( b, "a", function () {
		return h
	} );
	var d = c( 7 ), e = c( 17 ), f = c( 13 ), g = function ( a ) {
		if ( !f.isArray( a ) ) throw new Error( "cases must be an array" );
		if ( 0 === a.length ) throw new Error( "there must be at least one case" );
		var b = [], c = {};
		return d.each( a, function ( g, h ) {
			var i = e.keys( g );
			if ( 1 !== i.length ) throw new Error( "one and only one name per case" );
			var j = i[ 0 ], k = g[ j ];
			if ( void 0 !== c[ j ] ) throw new Error( "duplicate key detected:" + j );
			if ( "cata" === j ) throw new Error( "cannot have a case named cata (sorry)" );
			if ( !f.isArray( k ) ) throw new Error( "case arguments must be an array" );
			b.push( j ), c[ j ] = function () {
				var c = arguments.length;
				if ( c !== k.length ) throw new Error( "Wrong number of arguments to case " + j + ". Expected " + k.length + " (" + k + "), got " + c );
				for ( var f = new Array( c ), g = 0; g < f.length; g++ ) f[ g ] = arguments[ g ];
				var i = function ( a ) {
					var c = e.keys( a );
					if ( b.length !== c.length ) throw new Error( "Wrong number of arguments to match. Expected: " + b.join( "," ) + "\nActual: " + c.join( "," ) );
					if ( !d.forall( b, function ( a ) {
						return d.contains( c, a )
					} ) ) throw new Error( "Not all branches were specified when using match. Specified: " + c.join( ", " ) + "\nRequired: " + b.join( ", " ) );
					return a[ j ].apply( null, f )
				};
				return {
					fold: function () {
						if ( arguments.length !== a.length ) throw new Error( "Wrong number of arguments to fold. Expected " + a.length + ", got " + arguments.length );
						return arguments[ h ].apply( null, f )
					}, match: i, log: function ( a ) {
						console.log( a, {
							constructors: b,
							constructor: j,
							params: f
						} )
					}
				}
			}
		} ), c
	}, h = { generate: g }
}, function ( a, b, c ) {
	"use strict";
	c.d( b, "a", function () {
		return h
	} );
	var d = c( 27 ), e = c( 71 ), f = function ( a ) {
		var b = function ( b ) {
			a( e.a( b ) )
		};
		return {
			map: function ( a ) {
				return f( function ( c ) {
					b( function ( b ) {
						var d = a( b );
						c( d )
					} )
				} )
			}, bind: function ( a ) {
				return f( function ( c ) {
					b( function ( b ) {
						a( b ).get( c )
					} )
				} )
			}, anonBind: function ( a ) {
				return f( function ( c ) {
					b( function ( b ) {
						a.get( c )
					} )
				} )
			}, toLazy: function () {
				return d.a.nu( b )
			}, get: b
		}
	}, g = function ( a ) {
		return f( function ( b ) {
			b( a )
		} )
	}, h = { nu: f, pure: g }
}, function ( a, b, c ) {
	"use strict";
	c.d( b, "a", function () {
		return h
	} );
	var d = c( 7 ), e = c( 8 ), f = function ( a ) {
		var b = e.a.none(), c = [], g = function ( a ) {
			return f( function ( b ) {
				h( function ( c ) {
					b( a( c ) )
				} )
			} )
		}, h = function ( a ) {
			j() ? l( a ) : c.push( a )
		}, i = function ( a ) {
			b = e.a.some( a ), k( c ), c = []
		}, j = function () {
			return b.isSome()
		}, k = function ( a ) {
			d.each( a, l )
		}, l = function ( a ) {
			b.each( function ( b ) {
				setTimeout( function () {
					a( b )
				}, 0 )
			} )
		};
		return a( i ), { get: h, map: g, isReady: j }
	}, g = function ( a ) {
		return f( function ( b ) {
			b( a )
		} )
	}, h = { nu: f, pure: g }
}, function ( a, b, c ) {
	"use strict";
	var d = function ( a, b ) {
		for ( var c = 0; c < a.length; c++ ) {
			var d = a[ c ];
			if ( d.test( b ) ) return d
		}
	}, e = function ( a, b ) {
		var c = d( a, b );
		if ( !c ) return { major: 0, minor: 0 };
		var e = function ( a ) {
			return Number( b.replace( c, "$" + a ) )
		};
		return h( e( 1 ), e( 2 ) )
	}, f = function ( a, b ) {
		var c = String( b ).toLowerCase();
		return 0 === a.length ? g() : e( a, c )
	}, g = function () {
		return h( 0, 0 )
	}, h = function ( a, b ) {
		return { major: a, minor: b }
	};
	b.a = { nu: h, detect: f, unknown: g }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 2 );
	b.a = {
		ATTRIBUTE: d.b.ATTRIBUTE_NODE,
		CDATA_SECTION: d.b.CDATA_SECTION_NODE,
		COMMENT: d.b.COMMENT_NODE,
		DOCUMENT: d.b.DOCUMENT_NODE,
		DOCUMENT_TYPE: d.b.DOCUMENT_TYPE_NODE,
		DOCUMENT_FRAGMENT: d.b.DOCUMENT_FRAGMENT_NODE,
		ELEMENT: d.b.ELEMENT_NODE,
		TEXT: d.b.TEXT_NODE,
		PROCESSING_INSTRUCTION: d.b.PROCESSING_INSTRUCTION_NODE,
		ENTITY_REFERENCE: d.b.ENTITY_REFERENCE_NODE,
		ENTITY: d.b.ENTITY_NODE,
		NOTATION: d.b.NOTATION_NODE
	}
}, function ( a, b, c ) {
	"use strict";
	var d = c( 14 ), e = function ( a ) {
		return d.a.first( a ).isSome()
	}, f = function ( a, b, c ) {
		return d.a.ancestor( a, b, c ).isSome()
	}, g = function ( a, b, c ) {
		return d.a.closest( a, b, c ).isSome()
	}, h = function ( a, b ) {
		return d.a.sibling( a, b ).isSome()
	}, i = function ( a, b ) {
		return d.a.child( a, b ).isSome()
	}, j = function ( a, b ) {
		return d.a.descendant( a, b ).isSome()
	};
	b.a = {
		any: e,
		ancestor: f,
		closest: g,
		sibling: h,
		child: i,
		descendant: j
	}
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 32 ), f = c( 10 ), g = function ( a, b, c, g ) {
		var h = f.a.get( a, b );
		void 0 === h && (h = "");
		var i = h === c ? g : c, j = d.d.curry( f.a.set, a, b, h ),
			k = d.d.curry( f.a.set, a, b, i );
		return Object( e.a )( j, k, !1 )
	}, h = function ( a ) {
		return g( a, "visibility", "hidden", "visible" )
	}, i = function ( a, b ) {
		return g( a, "display", "none", b )
	}, j = function ( a ) {
		return a.offsetWidth <= 0 && a.offsetHeight <= 0
	}, k = function ( a ) {
		var b = a.dom();
		return !j( b )
	};
	b.a = { toggler: h, displayToggler: i, isVisible: k }
}, function ( a, b, c ) {
	"use strict";
	b.a = function ( a, b, c ) {
		var d = c || !1, e = function () {
			b(), d = !0
		}, f = function () {
			a(), d = !1
		};
		return {
			on: e, off: f, toggle: function () {
				(d ? f : e)()
			}, isOn: function () {
				return d
			}
		}
	}
}, function ( a, b, c ) {
	"use strict";
	var d = function ( a ) {
		return void 0 !== a.style
	};
	b.a = { isSupported: d }
}, function ( a, b, c ) {
	"use strict";
	c.d( b, "a", function () {
		return f
	} );
	var d = c( 0 ), e = function ( a, b ) {
		var c = function ( c, d ) {
			return e( a + c, b + d )
		};
		return { left: d.d.constant( a ), top: d.d.constant( b ), translate: c }
	}, f = e
}, function ( a, b, c ) {
	"use strict";
	var d = c( 6 ), e = c( 58 ), f = Object( e.a )( d.a.isText, "text" ),
		g = function ( a ) {
			return f.get( a )
		}, h = function ( a ) {
			return f.getOption( a )
		}, i = function ( a, b ) {
			f.set( a, b )
		};
	b.a = { get: g, getOption: h, set: i }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 32 ), e = c( 11 ), f = c( 63 ), g = function ( a, b ) {
		f.a.supports( a ) ? a.dom().classList.add( b ) : f.a.add( a, b )
	}, h = function ( a ) {
		0 === (f.a.supports( a ) ? a.dom().classList : f.a.get( a )).length && e.a.remove( a, "class" )
	}, i = function ( a, b ) {
		if ( f.a.supports( a ) ) {
			a.dom().classList.remove( b )
		} else f.a.remove( a, b );
		h( a )
	}, j = function ( a, b ) {
		return f.a.supports( a ) ? a.dom().classList.toggle( b ) : f.a.toggle( a, b )
	}, k = function ( a, b ) {
		var c = f.a.supports( a ), e = a.dom().classList, g = function () {
			c ? e.remove( b ) : f.a.remove( a, b )
		}, h = function () {
			c ? e.add( b ) : f.a.add( a, b )
		};
		return Object( d.a )( g, h, l( a, b ) )
	}, l = function ( a, b ) {
		return f.a.supports( a ) && a.dom().classList.contains( b )
	};
	b.a = { add: g, remove: i, toggle: j, toggler: k, has: l }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 65 ), e = c( 18 ), f = function ( a ) {
		return e.a.all( a )
	}, g = function ( a, b, c ) {
		return d.a.ancestors( a, function ( a ) {
			return e.a.is( a, b )
		}, c )
	}, h = function ( a, b ) {
		return d.a.siblings( a, function ( a ) {
			return e.a.is( a, b )
		} )
	}, i = function ( a, b ) {
		return d.a.children( a, function ( a ) {
			return e.a.is( a, b )
		} )
	}, j = function ( a, b ) {
		return e.a.all( b, a )
	};
	b.a = { all: f, ancestors: g, siblings: h, children: i, descendants: j }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 6 ), f = c( 35 ), g = c( 3 ), h = function ( a ) {
		return "img" === e.a.name( a ) ? 1 : f.a.getOption( a ).fold( function () {
			return g.a.children( a ).length
		}, function ( a ) {
			return a.length
		} )
	}, i = function ( a, b ) {
		return h( a ) === b
	}, j = function ( a, b ) {
		return 0 === b
	}, k = function ( a ) {
		return f.a.getOption( a ).filter( function ( a ) {
			return 0 !== a.trim().length || a.indexOf( "\xa0" ) > -1
		} ).isSome()
	}, l = [ "img", "br" ], m = function ( a ) {
		return k( a ) || d.b.contains( l, e.a.name( a ) )
	};
	b.a = { getEnd: h, isEnd: i, isStart: j, isCursorPosition: m }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 14 ), f = c( 3 ), g = c( 38 ), h = function ( a ) {
		return e.a.descendant( a, g.a.isCursorPosition )
	}, i = function ( a ) {
		return j( a, g.a.isCursorPosition )
	}, j = function ( a, b ) {
		var c = function ( a ) {
			for ( var e = f.a.children( a ), g = e.length - 1; g >= 0; g-- ) {
				var h = e[ g ];
				if ( b( h ) ) return d.h.some( h );
				var i = c( h );
				if ( i.isSome() ) return i
			}
			return d.h.none()
		};
		return c( a )
	};
	b.a = { first: h, last: i }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ),
		e = d.a.generate( [ { before: [ "element" ] }, { on: [ "element", "offset" ] }, { after: [ "element" ] } ] ),
		f = function ( a, b, c, d ) {
			return a.fold( b, c, d )
		}, g = function ( a ) {
			return a.fold( d.d.identity, d.d.identity, d.d.identity )
		};
	b.a = { before: e.before, on: e.on, after: e.after, cata: f, getStart: g }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 1 ), f = function ( a, b ) {
		var c = a.document.createRange();
		return g( c, b ), c
	}, g = function ( a, b ) {
		a.selectNodeContents( b.dom() )
	}, h = function ( a, b ) {
		return b.compareBoundaryPoints( a.END_TO_START, a ) < 1 && b.compareBoundaryPoints( a.START_TO_END, a ) > -1
	}, i = function ( a ) {
		return a.document.createRange()
	}, j = function ( a, b ) {
		b.fold( function ( b ) {
			a.setStartBefore( b.dom() )
		}, function ( b, c ) {
			a.setStart( b.dom(), c )
		}, function ( b ) {
			a.setStartAfter( b.dom() )
		} )
	}, k = function ( a, b ) {
		b.fold( function ( b ) {
			a.setEndBefore( b.dom() )
		}, function ( b, c ) {
			a.setEnd( b.dom(), c )
		}, function ( b ) {
			a.setEndAfter( b.dom() )
		} )
	}, l = function ( a, b ) {
		o( a ), a.insertNode( b.dom() )
	}, m = function ( a, b, c ) {
		var d = a.document.createRange();
		return j( d, b ), k( d, c ), d
	}, n = function ( a, b, c, d, e ) {
		var f = a.document.createRange();
		return f.setStart( b.dom(), c ), f.setEnd( d.dom(), e ), f
	}, o = function ( a ) {
		a.deleteContents()
	}, p = function ( a ) {
		var b = a.cloneContents();
		return e.a.fromDom( b )
	}, q = function ( a ) {
		return {
			left: d.d.constant( a.left ),
			top: d.d.constant( a.top ),
			right: d.d.constant( a.right ),
			bottom: d.d.constant( a.bottom ),
			width: d.d.constant( a.width ),
			height: d.d.constant( a.height )
		}
	}, r = function ( a ) {
		var b = a.getClientRects(),
			c = b.length > 0 ? b[ 0 ] : a.getBoundingClientRect();
		return c.width > 0 || c.height > 0 ? d.h.some( c ).map( q ) : d.h.none()
	}, s = function ( a ) {
		var b = a.getBoundingClientRect();
		return b.width > 0 || b.height > 0 ? d.h.some( b ).map( q ) : d.h.none()
	}, t = function ( a ) {
		return a.toString()
	};
	b.a = {
		create: i,
		replaceWith: l,
		selectNodeContents: f,
		selectNodeContentsUsing: g,
		relativeToNative: m,
		exactToNative: n,
		deleteContents: o,
		cloneFragment: p,
		getFirstRect: r,
		getBounds: s,
		isWithin: h,
		toString: t
	}
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 1 ), f = c( 41 ),
		g = d.a.generate( [ { ltr: [ "start", "soffset", "finish", "foffset" ] }, { rtl: [ "start", "soffset", "finish", "foffset" ] } ] ),
		h = function ( a, b, c ) {
			return b( e.a.fromDom( c.startContainer ), c.startOffset, e.a.fromDom( c.endContainer ), c.endOffset )
		}, i = function ( a, b ) {
			return b.match( {
				domRange: function ( a ) {
					return { ltr: d.d.constant( a ), rtl: d.h.none }
				}, relative: function ( b, c ) {
					return {
						ltr: d.o.cached( function () {
							return f.a.relativeToNative( a, b, c )
						} ), rtl: d.o.cached( function () {
							return d.h.some( f.a.relativeToNative( a, c, b ) )
						} )
					}
				}, exact: function ( b, c, e, g ) {
					return {
						ltr: d.o.cached( function () {
							return f.a.exactToNative( a, b, c, e, g )
						} ), rtl: d.o.cached( function () {
							return d.h.some( f.a.exactToNative( a, e, g, b, c ) )
						} )
					}
				}
			} )
		}, j = function ( a, b ) {
			var c = b.ltr();
			if ( c.collapsed ) {
				return b.rtl().filter( function ( a ) {
					return !1 === a.collapsed
				} ).map( function ( a ) {
					return g.rtl( e.a.fromDom( a.endContainer ), a.endOffset, e.a.fromDom( a.startContainer ), a.startOffset )
				} ).getOrThunk( function () {
					return h( 0, g.ltr, c )
				} )
			}
			return h( 0, g.ltr, c )
		}, k = function ( a, b ) {
			var c = i( a, b );
			return j( 0, c )
		}, l = function ( a, b ) {
			return k( a, b ).match( {
				ltr: function ( b, c, d, e ) {
					var f = a.document.createRange();
					return f.setStart( b.dom(), c ), f.setEnd( d.dom(), e ), f
				}, rtl: function ( b, c, d, e ) {
					var f = a.document.createRange();
					return f.setStart( d.dom(), e ), f.setEnd( b.dom(), c ), f
				}
			} )
		};
	b.a = { ltr: g.ltr, rtl: g.rtl, diagnose: k, asLtrRange: l }
}, function ( a, b, c ) {
	"use strict";
	c.d( b, "a", function () {
		return d
	} );
	var d = function ( a ) {
		var b = a, c = function () {
			return b
		};
		return {
			get: c, set: function ( a ) {
				b = a
			}, clone: function () {
				return d( c() )
			}
		}
	}
}, function ( a, b, c ) {
	"use strict";
	c.d( b, "c", function () {
		return g
	} ), c.d( b, "d", function () {
		return h
	} ), c.d( b, "e", function () {
		return i
	} ), c.d( b, "b", function () {
		return j
	} ), c.d( b, "a", function () {
		return k
	} );
	var d = c( 7 ), e = c( 13 ), f = function ( a ) {
		return a.slice( 0 ).sort()
	}, g = function ( a, b ) {
		throw new Error( "All required keys (" + f( a ).join( ", " ) + ") were not specified. Specified keys were: " + f( b ).join( ", " ) + "." )
	}, h = function ( a ) {
		throw new Error( "Unsupported keys for object: " + f( a ).join( ", " ) )
	}, i = function ( a, b ) {
		if ( !e.isArray( b ) ) throw new Error( "The " + a + " fields must be an array. Was: " + b + "." );
		d.each( b, function ( b ) {
			if ( !e.isString( b ) ) throw new Error( "The value " + b + " in the " + a + " fields was not a string." )
		} )
	}, j = function ( a, b ) {
		throw new Error( "All values need to be of type: " + b + ". Keys (" + f( a ).join( ", " ) + ") were not." )
	}, k = function ( a ) {
		var b = f( a );
		d.find( b, function ( a, c ) {
			return c < b.length - 1 && a === b[ c + 1 ]
		} ).each( function ( a ) {
			throw new Error( "The field: " + a + " occurs more than once in the combined fields: [" + b.join( ", " ) + "]." )
		} )
	}
}, function ( a, b, c ) {
	"use strict";
	c.d( b, "a", function () {
		return h
	} );
	var d = c( 12 ), e = c( 8 ), f = function ( a ) {
		var b = function ( b ) {
			return a === b
		}, c = function ( b ) {
			return f( a )
		}, g = function ( b ) {
			return f( a )
		}, h = function ( b ) {
			return f( b( a ) )
		}, i = function ( b ) {
			b( a )
		}, j = function ( b ) {
			return b( a )
		}, k = function ( b, c ) {
			return c( a )
		}, l = function ( b ) {
			return b( a )
		}, m = function ( b ) {
			return b( a )
		}, n = function () {
			return e.a.some( a )
		};
		return {
			is: b,
			isValue: d.always,
			isError: d.never,
			getOr: d.constant( a ),
			getOrThunk: d.constant( a ),
			getOrDie: d.constant( a ),
			or: c,
			orThunk: g,
			fold: k,
			map: h,
			each: i,
			bind: j,
			exists: l,
			forall: m,
			toOption: n
		}
	}, g = function ( a ) {
		var b = function ( a ) {
			return a()
		}, c = function () {
			return d.die( String( a ) )()
		}, f = function ( a ) {
			return a
		}, h = function ( a ) {
			return a()
		}, i = function ( b ) {
			return g( a )
		}, j = function ( b ) {
			return g( a )
		}, k = function ( b, c ) {
			return b( a )
		};
		return {
			is: d.never,
			isValue: d.never,
			isError: d.always,
			getOr: d.identity,
			getOrThunk: b,
			getOrDie: c,
			or: f,
			orThunk: h,
			fold: k,
			map: i,
			each: d.noop,
			bind: j,
			exists: d.never,
			forall: d.always,
			toOption: e.a.none
		}
	}, h = { value: f, error: g }
}, function ( a, b, c ) {
	"use strict";
	c.d( b, "a", function () {
		return e
	} );
	var d = c( 7 ), e = function ( a, b ) {
		return b( function ( b ) {
			var c = [], e = 0, f = function ( d ) {
				return function ( f ) {
					c[ d ] = f, ++e >= a.length && b( c )
				}
			};
			0 === a.length ? b( [] ) : d.each( a, function ( a, b ) {
				a.get( f( b ) )
			} )
		} )
	}
}, function ( a, b, c ) {
	"use strict";
	c.d( b, "a", function () {
		return d
	} );
	var d = "undefined" != typeof window ? window : Function( "return this;" )()
}, function ( a, b, c ) {
	"use strict";
	var d = c( 4 ), e = c( 1 ), f = c( 3 ), g = function ( a, b, c, d ) {
		var e = f.a.owner( a ), g = e.dom().createRange();
		return g.setStart( a.dom(), b ), g.setEnd( c.dom(), d ), g
	}, h = function ( a, b, c, d ) {
		var f = g( a, b, c, d );
		return e.a.fromDom( f.commonAncestorContainer )
	}, i = function ( a, b, c, e ) {
		var f = g( a, b, c, e ), h = d.a.eq( a, c ) && b === e;
		return f.collapsed && !h
	};
	b.a = { after: i, commonAncestorContainer: h }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 4 ), f = c( 1 ), g = c( 6 ), h = c( 14 ), i = c( 2 ),
		j = function ( a, b ) {
			var c = b || f.a.fromDom( i.g.documentElement );
			return h.a.ancestor( a, d.d.curry( e.a.eq, c ) ).isSome()
		}, k = function ( a ) {
			var b = a.dom();
			return b === b.window && a instanceof i.c ? a : g.a.isDocument( a ) ? b.defaultView || b.parentWindow : null
		};
	b.a = { attached: j, windowOf: k }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 );
	b.a = function ( a, b, c, e, f ) {
		return a( c, e ) ? d.h.some( c ) : d.p.isFunction( f ) && f( c ) ? d.h.none() : b( c, e, f )
	}
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 1 ), f = function ( a, b, c, e, f, g, h ) {
		return {
			target: d.d.constant( a ),
			x: d.d.constant( b ),
			y: d.d.constant( c ),
			stop: e,
			prevent: f,
			kill: g,
			raw: d.d.constant( h )
		}
	}, g = function ( a, b ) {
		return function ( c ) {
			if ( a( c ) ) {
				var g = e.a.fromDom( c.target ), h = function () {
						c.stopPropagation()
					}, i = function () {
						c.preventDefault()
					}, j = d.d.compose( i, h ),
					k = f( g, c.clientX, c.clientY, h, i, j, c );
				b( k )
			}
		}
	}, h = function ( a, b, c, e, f ) {
		var h = g( c, e );
		return a.dom().addEventListener( b, h, f ), { unbind: d.d.curry( k, a, b, h, f ) }
	}, i = function ( a, b, c, d ) {
		return h( a, b, c, d, !1 )
	}, j = function ( a, b, c, d ) {
		return h( a, b, c, d, !0 )
	}, k = function ( a, b, c, d ) {
		a.dom().removeEventListener( b, c, d )
	};
	b.a = { bind: i, capture: j }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 9 ), f = c( 3 ), g = c( 31 ), h = c( 2 ),
		i = function ( a, b ) {
			var c = Object( h.h )( b, 500 );
			return function () {
				Object( h.d )( c )
			}
		}, j = function ( a, b ) {
			var c = new window.MutationObserver( b ), d = function () {
				c.disconnect()
			};
			return c.observe( f.a.owner( a ).dom(), {
				attributes: !0,
				subtree: !0,
				childList: !0,
				attributeFilter: [ "style", "class" ]
			} ), d
		},
		k = void 0 !== window.MutationObserver && null !== window.MutationObserver ? j : i,
		l = function ( a, b ) {
			if ( g.a.isVisible( a ) ) return e.d.requestAnimationFrame( b ), d.d.noop;
			var c = d.n.adaptable( function () {
				g.a.isVisible( a ) && (f(), e.d.requestAnimationFrame( b ))
			}, 100 ), f = k( a, c.throttle );
			return f
		};
	b.a = { onShow: l }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 15 ), e = c( 10 ), f = c( 54 ),
		g = Object( f.a )( "height", function ( a ) {
			var b = a.dom();
			return d.a.inBody( a ) ? b.getBoundingClientRect().height : b.offsetHeight
		} ), h = function ( a, b ) {
			g.set( a, b )
		}, i = function ( a ) {
			return g.get( a )
		}, j = function ( a ) {
			return g.getOuter( a )
		}, k = function ( a, b ) {
			var c = [ "margin-top", "border-top-width", "padding-top", "padding-bottom", "border-bottom-width", "margin-bottom" ],
				d = g.max( a, b, c );
			e.a.set( a, "max-height", d + "px" )
		};
	b.a = { set: h, get: i, getOuter: j, setMax: k }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 10 ), f = c( 33 );
	b.a = function ( a, b ) {
		var c = function ( b, c ) {
			if ( !d.p.isNumber( c ) && !c.match( /^[0-9]+$/ ) ) throw a + ".set accepts only positive integer values. Value was " + c;
			var e = b.dom();
			f.a.isSupported( e ) && (e.style[ a ] = c + "px")
		}, g = function ( c ) {
			var d = b( c );
			if ( d <= 0 || null === d ) {
				var f = e.a.get( c, a );
				return parseFloat( f ) || 0
			}
			return d
		}, h = g, i = function ( a, b ) {
			return d.b.foldl( b, function ( b, c ) {
				var d = e.a.get( a, c ),
					f = void 0 === d ? 0 : parseInt( d, 10 );
				return isNaN( f ) ? b : b + f
			}, 0 )
		};
		return {
			set: c,
			get: g,
			getOuter: h,
			aggregate: i,
			max: function ( a, b, c ) {
				var d = i( a, c );
				return b > d ? b - d : 0
			}
		}
	}
}, function ( a, b, c ) {
	"use strict";
	var d = c( 10 ), e = c( 54 ), f = Object( e.a )( "width", function ( a ) {
		return a.dom().offsetWidth
	} ), g = function ( a, b ) {
		f.set( a, b )
	}, h = function ( a ) {
		return f.get( a )
	}, i = function ( a ) {
		return f.getOuter( a )
	}, j = function ( a, b ) {
		var c = [ "margin-left", "border-left-width", "padding-left", "padding-right", "border-right-width", "margin-right" ],
			e = f.max( a, b, c );
		d.a.set( a, "max-width", e + "px" )
	};
	b.a = { set: g, get: h, getOuter: i, setMax: j }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 9 ), f = c( 16 ), g = c( 21 ), h = c( 15 ),
		i = c( 1 ), j = c( 57 ), k = c( 34 ), l = c( 2 ),
		m = e.c.detect().browser.isSafari(), n = function ( a ) {
			var b = void 0 !== a ? a.dom() : l.g,
				c = b.body.scrollLeft || b.documentElement.scrollLeft,
				d = b.body.scrollTop || b.documentElement.scrollTop;
			return Object( k.a )( c, d )
		}, o = function ( a, b, c ) {
			(void 0 !== c ? c.dom() : l.g).defaultView.scrollTo( a, b )
		}, p = function ( a, b, c ) {
			(void 0 !== c ? c.dom() : l.g).defaultView.scrollBy( a, b )
		}, q = function ( a, b ) {
			var c = j.a.absolute( b ), d = i.a.fromDom( a.document );
			o( c.left(), c.top(), d )
		}, r = function ( a, b ) {
			var c = n( a );
			b();
			var d = n( a );
			c.top() === d.top() && c.left() === d.left() || o( c.left(), c.top(), a )
		}, s = function ( a ) {
			var b = d.h.none(), c = function () {
				b = d.h.some( n( a ) )
			}, e = function () {
				b.each( function ( b ) {
					o( b.left(), b.top(), a )
				} )
			};
			return c(), { save: c, restore: e }
		}, t = function ( a, b ) {
			m && d.p.isFunction( a.dom().scrollIntoViewIfNeeded ) ? a.dom().scrollIntoViewIfNeeded( !1 ) : a.dom().scrollIntoView( b )
		}, u = function ( a, b ) {
			var c = b.dom().getBoundingClientRect(),
				d = a.dom().getBoundingClientRect();
			d.top < c.top ? t( a, !0 ) : d.bottom > c.bottom && t( a, !1 )
		}, v = function () {
			var a = i.a.fromHtml( '<div style="width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;"></div>' );
			f.a.after( h.a.body(), a );
			var b = a.dom().offsetWidth - a.dom().clientWidth;
			return g.a.remove( a ), b
		};
	b.a = {
		get: n,
		to: o,
		by: p,
		preserve: r,
		capture: s,
		intoView: t,
		intoViewIfNeeded: u,
		setToElement: q,
		scrollBarWidth: v
	}
}, function ( a, b, c ) {
	"use strict";
	var d = c( 49 ), e = c( 1 ), f = c( 34 ), g = function ( a ) {
		var b = a.getBoundingClientRect();
		return Object( f.a )( b.left, b.top )
	}, h = function ( a, b ) {
		return void 0 !== a ? a : void 0 !== b ? b : 0
	}, i = function ( a ) {
		var b = a.dom().ownerDocument, c = b.body,
			f = d.a.windowOf( e.a.fromDom( b ) ), g = b.documentElement,
			i = h( f.pageYOffset, g.scrollTop ),
			j = h( f.pageXOffset, g.scrollLeft ),
			l = h( g.clientTop, c.clientTop ),
			m = h( g.clientLeft, c.clientLeft );
		return k( a ).translate( j - m, i - l )
	}, j = function ( a ) {
		var b = a.dom();
		return Object( f.a )( b.offsetLeft, b.offsetTop )
	}, k = function ( a ) {
		var b = a.dom(), c = b.ownerDocument, h = c.body,
			i = e.a.fromDom( c.documentElement );
		return h === b ? Object( f.a )( h.offsetLeft, h.offsetTop ) : d.a.attached( a, i ) ? g( b ) : Object( f.a )( 0, 0 )
	};
	b.a = { absolute: i, relative: j, viewport: k }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 9 ), e = c( 0 );
	b.a = function ( a, b ) {
		var c = function ( c ) {
				if ( !a( c ) ) throw new Error( "Can only get " + b + " value of a " + b + " node" );
				return i( c ).getOr( "" )
			}, f = function ( a ) {
				try {
					return g( a )
				} catch ( a ) {
					return e.h.none()
				}
			}, g = function ( b ) {
				return a( b ) ? e.h.from( b.dom().nodeValue ) : e.h.none()
			}, h = d.c.detect().browser,
			i = h.isIE() && 10 === h.version.major ? f : g;
		return {
			get: c, getOption: i, set: function ( c, d ) {
				if ( !a( c ) ) throw new Error( "Can only set raw " + b + " value of a " + b + " node" );
				c.dom().nodeValue = d
			}
		}
	}
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 1 ), f = c( 3 ), g = c( 2 ), h = function ( a, b ) {
		var c = b || g.g, d = c.createElement( "div" );
		return d.innerHTML = a, f.a.children( e.a.fromDom( d ) )
	}, i = function ( a, b ) {
		return d.b.map( a, function ( a ) {
			return e.a.fromTag( a, b )
		} )
	}, j = function ( a, b ) {
		return d.b.map( a, function ( a ) {
			return e.a.fromText( a, b )
		} )
	}, k = function ( a ) {
		return d.b.map( a, e.a.fromDom )
	};
	b.a = { fromHtml: h, fromTags: i, fromText: j, fromDom: k }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 1 ), f = c( 2 ), g = function ( a, b ) {
		var c = b || f.g, g = c.createDocumentFragment();
		return d.b.each( a, function ( a ) {
			g.appendChild( a.dom() )
		} ), e.a.fromDom( g )
	};
	b.a = { fromElements: g }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 10 ), e = function ( a, b ) {
		return function ( c ) {
			return "rtl" === f( c ) ? b : a
		}
	}, f = function ( a ) {
		return "rtl" === d.a.get( a, "direction" ) ? "rtl" : "ltr"
	};
	b.a = { onDirection: e, getDirection: f }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 11 ), f = function ( a, b ) {
		var c = e.a.get( a, b );
		return void 0 === c || "" === c ? [] : c.split( " " )
	}, g = function ( a, b, c ) {
		var d = f( a, b ), g = d.concat( [ c ] );
		return e.a.set( a, b, g.join( " " ) ), !0
	}, h = function ( a, b, c ) {
		var g = d.b.filter( f( a, b ), function ( a ) {
			return a !== c
		} );
		return g.length > 0 ? e.a.set( a, b, g.join( " " ) ) : e.a.remove( a, b ), !1
	};
	b.a = { read: f, add: g, remove: h }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 62 ), f = function ( a ) {
		return void 0 !== a.dom().classList
	}, g = function ( a ) {
		return e.a.read( a, "class" )
	}, h = function ( a, b ) {
		return e.a.add( a, "class", b )
	}, i = function ( a, b ) {
		return e.a.remove( a, "class", b )
	}, j = function ( a, b ) {
		return d.b.contains( g( a ), b ) ? i( a, b ) : h( a, b )
	};
	b.a = { get: g, add: h, remove: i, toggle: j, supports: f }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 36 ), f = c( 63 ), g = function ( a, b ) {
		d.b.each( b, function ( b ) {
			e.a.add( a, b )
		} )
	}, h = function ( a, b ) {
		d.b.each( b, function ( b ) {
			e.a.remove( a, b )
		} )
	}, i = function ( a, b ) {
		d.b.each( b, function ( b ) {
			e.a.toggle( a, b )
		} )
	}, j = function ( a, b ) {
		return d.b.forall( b, function ( b ) {
			return e.a.has( a, b )
		} )
	}, k = function ( a, b ) {
		return d.b.exists( b, function ( b ) {
			return e.a.has( a, b )
		} )
	}, l = function ( a ) {
		for ( var b = a.dom().classList, c = new Array( b.length ), d = 0; d < b.length; d++ ) c[ d ] = b.item( d );
		return c
	}, m = function ( a ) {
		return f.a.supports( a ) ? l( a ) : f.a.get( a )
	};
	b.a = { add: g, remove: h, toggle: i, hasAll: j, hasAny: k, get: m }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 15 ), f = c( 3 ), g = function ( a ) {
		return k( e.a.body(), a )
	}, h = function ( a, b, c ) {
		return d.b.filter( f.a.parents( a, c ), b )
	}, i = function ( a, b ) {
		return d.b.filter( f.a.siblings( a ), b )
	}, j = function ( a, b ) {
		return d.b.filter( f.a.children( a ), b )
	}, k = function ( a, b ) {
		var c = [];
		return d.b.each( f.a.children( a ), function ( a ) {
			b( a ) && (c = c.concat( [ a ] )), c = c.concat( k( a, b ) )
		} ), c
	};
	b.a = { all: g, ancestors: h, siblings: i, children: j, descendants: k }
}, function ( a, b, c ) {
	"use strict";
	var d = function ( a, b, c, d, e ) {
		if ( 0 === e ) return 0;
		if ( b === d ) return e - 1;
		for ( var f = d, g = 1; g < e; g++ ) {
			var h = a( g ), i = Math.abs( b - h.left );
			if ( c <= h.bottom ) {
				if ( c < h.top || i > f ) return g - 1;
				f = i
			}
		}
		return 0
	}, e = function ( a, b, c ) {
		return b >= a.left && b <= a.right && c >= a.top && c <= a.bottom
	};
	b.a = { inRect: e, searchForPoint: d }
}, function ( a, b ) {
	function c( a ) {
		return a && a.nodeType === e
	}

	function d( a ) {
		return c( a ) ? a : c( a.ownerDocument ) ? a.ownerDocument : c( a.document ) ? a.document : a.parentNode ? d( a.parentNode ) : a.commonAncestorContainer ? d( a.commonAncestorContainer ) : a.startContainer ? d( a.startContainer ) : a.anchorNode ? d( a.anchorNode ) : void 0
	}

	a.exports = d;
	var e = 9
}, function ( a, b, c ) {
	"use strict";
	Object.defineProperty( b, "__esModule", { value: !0 } );
	var d = c( 24 ), e = c( 69 ), f = c( 163 ), g = c( 164 ),
		h = function ( a, b ) {
			var c = function ( b ) {
				e.d( a, b )
			}, h = function () {
				e.b( a )
			}, i = function ( b ) {
				e.c( a, b )
			}, j = function () {
				return e.a( a )
			}, k = g.a( j, function ( b ) {
				// Firing annotation moved.
				a.fire( d.a(), b )
			} );
			return a.on( "remove", function () {
				k.stop()
			} ), a.on( "init", function () {
				f.a( a ), k.start( a.contentDocument )
			} ), {
				getAnnotations: j,
				removeAnnotation: i,
				removeAllAnnotations: h,
				setAnnotations: c
			}
		};
	tinymce.PluginManager.add( "wp-annotations", h ), b.default = function () {
	}
}, function ( a, b, c ) {
	"use strict";
	c.d( b, "a", function () {
		return q
	} ), c.d( b, "d", function () {
		return k
	} ), c.d( b, "b", function () {
		return m
	} ), c.d( b, "c", function () {
		return o
	} );
	var d = c( 0 ), e = c( 95 ), f = c( 154 ), g = (c.n( f ), c( 24 )),
		h = f.toRange, i = f.fromRange, j = function ( a, b ) {
			var c = a.selection.getBookmark();
			b(), a.selection.moveToBookmark( c )
		}, k = function ( a, b ) {
			a.getBody().normalize();
			var c = d.b.map( b, function ( b ) {
				return {
					rng: h( b.xpath.start, b.xpath.startOffset, b.xpath.end, b.xpath.endOffset, a.getBody() ),
					data: b
				}
			} );
			j( a, function () {
				d.b.each( c, function ( b ) {
					a.selection.setRng( b.rng ), a.execCommand( g.c(), null, b.data )
				} )
			} )
		}, l = function ( a ) {
			e.d.unwrap( e.c.fromDom( a ) )
		}, m = function ( a ) {
			j( a, function () {
				var b = a.experimental.annotator.getAll( g.e() );
				d.g.each( b, function ( a, b ) {
					d.b.each( a, l )
				} )
			} )
		}, n = function ( a, b ) {
			return e.e.descendants( a, '[data-mce-annotation-uid="' + b + '"]' )
		}, o = function ( a, b ) {
			j( a, function () {
				var c = e.c.fromDom( a.getBody() ), f = n( c, b );
				d.b.each( f, e.d.unwrap )
			} )
		}, p = function ( a, b, c ) {
			var f = n( a, b );
			if ( f.length > 0 ) {
				var g = f[ 0 ], h = f[ f.length - 1 ], j = g.dom().childNodes[ 0 ],
					k = h.dom().childNodes[ h.dom().childNodes.length - 1 ];
				e.d.unwrap( g ), e.a.eq( g, h ) || e.d.unwrap( h );
				var l = g.dom().ownerDocument.createRange();
				l.setStartBefore( j ), l.setEndAfter( k ), a.dom().normalize();
				var m = i( l, a.dom() );
				return d.k.value( { uid: b, original: c, xpath: m } )
			}
			return d.k.error( "Could not find corresponding markers in cloned body" )
		}, q = function ( a ) {
			var b = e.c.fromDom( a.getBody().cloneNode( !0 ) );
			b.dom().normalize();
			var c = a.experimental.annotator.getAll( g.e() ),
				f = d.g.mapToArray( c, function ( a, c ) {
					return p( b, c, a[ 0 ] ).getOrDie()
				} );
			return d.b.sort( f, function ( a, b ) {
				return e.b.after( e.c.fromDom( a.original ), 0, e.c.fromDom( b.original ), 0 ) ? 1 : -1
			} )
		}
}, function ( a, b, c ) {
	"use strict";
	var d = (c( 7 ), c( 12 ));
	c( 17 ), c( 13 ), c( 44 ), d.noop
}, function ( a, b, c ) {
	"use strict";
	c.d( b, "a", function () {
		return d
	} );
	var d = function ( a ) {
		return function () {
			for ( var b = [], c = 0; c < arguments.length; c++ ) b[ c ] = arguments[ c ];
			var d = this;
			setTimeout( function () {
				a.apply( d, b )
			}, 0 )
		}
	}
}, function ( a, b, c ) {
	"use strict";
	c( 26 ), c( 45 ), this && this.__assign || Object.assign
}, function ( a, b, c ) {
	"use strict";
	c( 7 ), c( 26 ), c( 46 )
}, function ( a, b, c ) {
	"use strict"
}, function ( a, b, c ) {
	"use strict"
}, function ( a, b, c ) {
	"use strict";
	c( 27 ), c( 46 )
}, function ( a, b, c ) {
	"use strict";
	var d = c( 13 ), e = function ( a, b ) {
		return b
	}, f = function ( a, b ) {
		return d.isObject( a ) && d.isObject( b ) ? h( a, b ) : b
	}, g = function ( a ) {
		return function () {
			for ( var b = new Array( arguments.length ), c = 0; c < b.length; c++ ) b[ c ] = arguments[ c ];
			if ( 0 === b.length ) throw new Error( "Can't merge zero objects" );
			for ( var d = {}, e = 0; e < b.length; e++ ) {
				var f = b[ e ];
				for ( var g in f ) f.hasOwnProperty( g ) && (d[ g ] = a( d[ g ], f[ g ] ))
			}
			return d
		}
	}, h = g( f );
	g( e )
}, function ( a, b, c ) {
	"use strict"
}, function ( a, b, c ) {
	"use strict";
	Object.defineProperty( b, "__esModule", { value: !0 } ), c.d( b, "cat", function () {
		return e
	} ), c.d( b, "findMap", function () {
		return f
	} ), c.d( b, "liftN", function () {
		return g
	} );
	var d = c( 8 ), e = function ( a ) {
		for ( var b = [], c = function ( a ) {
			b.push( a )
		}, d = 0; d < a.length; d++ ) a[ d ].each( c );
		return b
	}, f = function ( a, b ) {
		for ( var c = 0; c < a.length; c++ ) {
			var e = b( a[ c ], c );
			if ( e.isSome() ) return e
		}
		return d.a.none()
	}, g = function ( a, b ) {
		for ( var c = [], e = 0; e < a.length; e++ ) {
			var f = a[ e ];
			if ( !f.isSome() ) return d.a.none();
			c.push( f.getOrDie() )
		}
		return d.a.some( b.apply( null, c ) )
	}
}, function ( a, b, c ) {
	"use strict";
	Object.defineProperty( b, "__esModule", { value: !0 } ), c.d( b, "path", function () {
		return e
	} ), c.d( b, "resolve", function () {
		return f
	} ), c.d( b, "step", function () {
		return g
	} ), c.d( b, "forge", function () {
		return h
	} ), c.d( b, "namespace", function () {
		return i
	} );
	var d = c( 47 ), e = function ( a, b ) {
		for ( var c = void 0 !== b && null !== b ? b : d.a, e = 0; e < a.length && void 0 !== c && null !== c; ++e ) c = c[ a[ e ] ];
		return c
	}, f = function ( a, b ) {
		var c = a.split( "." );
		return e( c, b )
	}, g = function ( a, b ) {
		return void 0 !== a[ b ] && null !== a[ b ] || (a[ b ] = {}), a[ b ]
	}, h = function ( a, b ) {
		for ( var c = void 0 !== b ? b : d.a, e = 0; e < a.length; ++e ) c = g( c, a[ e ] );
		return c
	}, i = function ( a, b ) {
		var c = a.split( "." );
		return h( c, b )
	}
}, function ( a, b, c ) {
	"use strict";
	var d = c( 25 );
	c( 7 ), d.a.generate( [ { bothErrors: [ "error1", "error2" ] }, { firstError: [ "error1", "value2" ] }, { secondError: [ "value1", "error2" ] }, { bothValues: [ "value1", "value2" ] } ] )
}, function ( a, b, c ) {
	"use strict";
	c( 8 ), c( 43 )
}, function ( a, b, c ) {
	"use strict";
	var d = c( 25 ),
		e = d.a.generate( [ { starts: [ "value", "f" ] }, { pattern: [ "regex", "f" ] }, { contains: [ "value", "f" ] }, { exact: [ "value", "f" ] }, { all: [] }, { not: [ "stringMatch" ] } ] ),
		f = function ( a ) {
			return a.toLowerCase()
		}, g = function ( a ) {
			return a
		}, h = function ( a, b ) {
			return a.fold( function ( a, c ) {
				return 0 === c( b ).indexOf( c( a ) )
			}, function ( a, c ) {
				return a.test( c( b ) )
			}, function ( a, c ) {
				return c( b ).indexOf( c( a ) ) >= 0
			}, function ( a, c ) {
				return c( b ) === c( a )
			}, function () {
				return !0
			}, function ( a ) {
				return !h( a, b )
			} )
		}, i = function ( a, b, c, d, e, f, g ) {
			return a.fold( b, c, d, e, f, g )
		};
	e.starts, e.pattern, e.contains, e.exact, e.all, e.not
}, function ( a, b, c ) {
	"use strict";
	Object.defineProperty( b, "__esModule", { value: !0 } ), c.d( b, "supplant", function () {
		return g
	} ), c.d( b, "removeLeading", function () {
		return h
	} ), c.d( b, "removeTrailing", function () {
		return i
	} ), c.d( b, "ensureLeading", function () {
		return j
	} ), c.d( b, "ensureTrailing", function () {
		return k
	} ), c.d( b, "contains", function () {
		return l
	} ), c.d( b, "capitalize", function () {
		return m
	} ), c.d( b, "startsWith", function () {
		return n
	} ), c.d( b, "endsWith", function () {
		return o
	} ), c.d( b, "trim", function () {
		return p
	} ), c.d( b, "lTrim", function () {
		return q
	} ), c.d( b, "rTrim", function () {
		return r
	} );
	var d = c( 85 ), e = c( 86 ), f = function ( a, b, c ) {
		return "" === b || !(a.length < b.length) && a.substr( c, c + b.length ) === b
	}, g = function ( a, b ) {
		var c = function ( a ) {
			var b = typeof a;
			return "string" === b || "number" === b
		};
		return a.replace( /\$\{([^{}]*)\}/g, function ( a, d ) {
			var e = b[ d ];
			return c( e ) ? e.toString() : a
		} )
	}, h = function ( a, b ) {
		return n( a, b ) ? d.d( a, b.length ) : a
	}, i = function ( a, b ) {
		return o( a, b ) ? d.c( a, b.length ) : a
	}, j = function ( a, b ) {
		return n( a, b ) ? a : d.b( a, b )
	}, k = function ( a, b ) {
		return o( a, b ) ? a : d.a( a, b )
	}, l = function ( a, b ) {
		return -1 !== a.indexOf( b )
	}, m = function ( a ) {
		return e.a( a ).bind( function ( b ) {
			return e.b( a ).map( function ( a ) {
				return b.toUpperCase() + a
			} )
		} ).getOr( a )
	}, n = function ( a, b ) {
		return f( a, b, 0 )
	}, o = function ( a, b ) {
		return f( a, b, a.length - b.length )
	}, p = function ( a ) {
		return a.replace( /^\s+|\s+$/g, "" )
	}, q = function ( a ) {
		return a.replace( /^\s+/g, "" )
	}, r = function ( a ) {
		return a.replace( /\s+$/g, "" )
	}
}, function ( a, b, c ) {
	"use strict";
	c.d( b, "b", function () {
		return d
	} ), c.d( b, "a", function () {
		return e
	} ), c.d( b, "d", function () {
		return f
	} ), c.d( b, "c", function () {
		return g
	} );
	var d = function ( a, b ) {
		return b + a
	}, e = function ( a, b ) {
		return a + b
	}, f = function ( a, b ) {
		return a.substring( b )
	}, g = function ( a, b ) {
		return a.substring( 0, a.length - b )
	}
}, function ( a, b, c ) {
	"use strict";
	c.d( b, "a", function () {
		return e
	} ), c.d( b, "b", function () {
		return f
	} );
	var d = c( 8 ), e = function ( a ) {
		return "" === a ? d.a.none() : d.a.some( a.substr( 0, 1 ) )
	}, f = function ( a ) {
		return "" === a ? d.a.none() : d.a.some( a.substring( 1 ) )
	}
}, function ( a, b, c ) {
	"use strict";
	Object.defineProperty( b, "__esModule", { value: !0 } );
	var d = c( 88 ), e = c( 89 );
	c.d( b, "immutable", function () {
		return d.a
	} ), c.d( b, "immutableBag", function () {
		return e.a
	} )
}, function ( a, b, c ) {
	"use strict";
	c.d( b, "a", function () {
		return f
	} );
	var d = c( 7 ), e = c( 12 ), f = function () {
		for ( var a = [], b = 0; b < arguments.length; b++ ) a[ b ] = arguments[ b ];
		return function () {
			for ( var b = [], c = 0; c < arguments.length; c++ ) b[ c ] = arguments[ c ];
			if ( a.length !== b.length ) throw new Error( 'Wrong number of arguments to struct. Expected "[' + a.length + ']", got ' + b.length + " arguments" );
			var f = {};
			return d.each( a, function ( a, c ) {
				f[ a ] = e.constant( b[ c ] )
			} ), f
		}
	}
}, function ( a, b, c ) {
	"use strict";
	c.d( b, "a", function () {
		return i
	} );
	var d = c( 7 ), e = c( 12 ), f = c( 17 ), g = c( 8 ), h = c( 44 ),
		i = function ( a, b ) {
			var c = a.concat( b );
			if ( 0 === c.length ) throw new Error( "You must specify at least one required or optional field." );
			return h.e( "required", a ), h.e( "optional", b ), h.a( c ), function ( i ) {
				var j = f.keys( i );
				d.forall( a, function ( a ) {
					return d.contains( j, a )
				} ) || h.c( a, j );
				var k = d.filter( j, function ( a ) {
					return !d.contains( c, a )
				} );
				k.length > 0 && h.d( k );
				var l = {};
				return d.each( a, function ( a ) {
					l[ a ] = e.constant( i[ a ] )
				} ), d.each( b, function ( a ) {
					l[ a ] = e.constant( Object.prototype.hasOwnProperty.call( i, a ) ? g.a.some( i[ a ] ) : g.a.none() )
				} ), l
			}
		}
}, function ( a, b, c ) {
	"use strict";
	Object.defineProperty( b, "__esModule", { value: !0 } ), c.d( b, "adaptable", function () {
		return d
	} ), c.d( b, "first", function () {
		return e
	} ), c.d( b, "last", function () {
		return f
	} );
	var d = function ( a, b ) {
		var c = null, d = null;
		return {
			cancel: function () {
				null !== c && (clearTimeout( c ), c = null, d = null)
			}, throttle: function () {
				for ( var e = [], f = 0; f < arguments.length; f++ ) e[ f ] = arguments[ f ];
				d = e, null === c && (c = setTimeout( function () {
					a.apply( null, d ), c = null, d = null
				}, b ))
			}
		}
	}, e = function ( a, b ) {
		var c = null;
		return {
			cancel: function () {
				null !== c && (clearTimeout( c ), c = null)
			}, throttle: function () {
				for ( var d = [], e = 0; e < arguments.length; e++ ) d[ e ] = arguments[ e ];
				null === c && (c = setTimeout( function () {
					a.apply( null, d ), c = null
				}, b ))
			}
		}
	}, f = function ( a, b ) {
		var c = null;
		return {
			cancel: function () {
				null !== c && (clearTimeout( c ), c = null)
			}, throttle: function () {
				for ( var d = [], e = 0; e < arguments.length; e++ ) d[ e ] = arguments[ e ];
				null !== c && clearTimeout( c ), c = setTimeout( function () {
					a.apply( null, d ), c = null
				}, b )
			}
		}
	}
}, function ( a, b, c ) {
	"use strict";
	Object.defineProperty( b, "__esModule", { value: !0 } ), c.d( b, "cached", function () {
		return d
	} );
	var d = function ( a ) {
		var b, c = !1;
		return function () {
			for ( var d = [], e = 0; e < arguments.length; e++ ) d[ e ] = arguments[ e ];
			return c || (c = !0, b = a.apply( null, d )), b
		}
	}
}, function ( a, b, c ) {
	"use strict"
}, function ( a, b, c ) {
	"use strict";
	c( 7 ), c( 17 )
}, function ( a, b, c ) {
	"use strict"
}, function ( a, b, c ) {
	"use strict";
	var d = c( 4 ), e = c( 48 ),
		f = (c( 49 ), c( 118 ), c( 119 ), c( 120 ), c( 16 ), c( 20 ), c( 121 ), c( 21 )),
		g = (c( 122 ), c( 19 ), c( 123 ), c( 124 ), c( 125 ), c( 127 ), c( 52 ), c( 15 ), c( 128 ), c( 129 ), c( 1 )),
		h = (c( 59 ), c( 60 ), c( 6 ), c( 29 ), c( 35 ), c( 130 ), c( 11 ), c( 131 ), c( 62 ), c( 132 ), c( 36 ), c( 64 ), c( 10 ), c( 133 ), c( 61 ), c( 134 ), c( 135 ), c( 136 ), c( 137 ), c( 32 ), c( 138 ), c( 139 ), c( 140 ), c( 30 ), c( 65 ), c( 14 ), c( 141 ), c( 37 ));
	c( 22 ), c( 18 ), c( 142 ), c( 3 ), c( 38 ), c( 39 ), c( 143 ), c( 23 ), c( 40 ), c( 144 ), c( 151 ), c( 152 ), c( 53 ), c( 57 ), c( 153 ), c( 34 ), c( 56 ), c( 31 ), c( 55 ), c( 42 );
	c.d( b, "a", function () {
		return d.a
	} ), c.d( b, "b", function () {
		return e.a
	} ), c.d( b, "d", function () {
		return f.a
	} ), c.d( b, "c", function () {
		return g.a
	} ), c.d( b, "e", function () {
		return h.a
	} )
}, function ( a, b, c ) {
	"use strict";
	c( 5 )
}, function ( a, b, c ) {
	"use strict";
	c( 5 )
}, function ( a, b, c ) {
	"use strict";
	c( 5 )
}, function ( a, b, c ) {
	"use strict";
	c( 5 )
}, function ( a, b, c ) {
	"use strict";
	c( 0 ), c( 5 )
}, function ( a, b, c ) {
	"use strict";
	c( 5 )
}, function ( a, b, c ) {
	"use strict";
	var d = c( 5 ), e = function () {
		return d.a.getOrDie( "Node" )
	}, f = function ( a, b, c ) {
		return 0 != (a.compareDocumentPosition( b ) & c)
	}, g = function ( a, b ) {
		return f( a, b, e().DOCUMENT_POSITION_PRECEDING )
	}, h = function ( a, b ) {
		return f( a, b, e().DOCUMENT_POSITION_CONTAINED_BY )
	};
	b.a = { documentPositionPreceding: g, documentPositionContainedBy: h }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 5 );
	b.a = function () {
		return d.a.getOrDie( "NodeFilter" )
	}
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 105 ), f = d.o.cached( function () {
		var a = navigator.userAgent;
		return e.a.detect( a )
	} );
	b.a = { detect: f }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 106 ), e = c( 107 ), f = c( 108 ), g = c( 109 ), h = c( 110 ),
		i = function ( a ) {
			var b = h.a.browsers(), c = h.a.oses(),
				i = g.a.detectBrowser( b, a ).fold( d.a.unknown, d.a.nu ),
				j = g.a.detectOs( c, a ).fold( e.a.unknown, e.a.nu );
			return { browser: i, os: j, deviceType: Object( f.a )( j, i, a ) }
		};
	b.a = { detect: i }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 28 ), f = function ( a, b ) {
		return function () {
			return b === a
		}
	}, g = function () {
		return h( { current: void 0, version: e.a.unknown() } )
	}, h = function ( a ) {
		var b = a.current;
		return {
			current: b,
			version: a.version,
			isEdge: f( "Edge", b ),
			isChrome: f( "Chrome", b ),
			isIE: f( "IE", b ),
			isOpera: f( "Opera", b ),
			isFirefox: f( "Firefox", b ),
			isSafari: f( "Safari", b )
		}
	};
	b.a = {
		unknown: g,
		nu: h,
		edge: d.d.constant( "Edge" ),
		chrome: d.d.constant( "Chrome" ),
		ie: d.d.constant( "IE" ),
		opera: d.d.constant( "Opera" ),
		firefox: d.d.constant( "Firefox" ),
		safari: d.d.constant( "Safari" )
	}
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 28 ), f = function ( a, b ) {
		return function () {
			return b === a
		}
	}, g = function () {
		return h( { current: void 0, version: e.a.unknown() } )
	}, h = function ( a ) {
		var b = a.current;
		return {
			current: b,
			version: a.version,
			isWindows: f( "Windows", b ),
			isiOS: f( "iOS", b ),
			isAndroid: f( "Android", b ),
			isOSX: f( "OSX", b ),
			isLinux: f( "Linux", b ),
			isSolaris: f( "Solaris", b ),
			isFreeBSD: f( "FreeBSD", b )
		}
	};
	b.a = {
		unknown: g,
		nu: h,
		windows: d.d.constant( "Windows" ),
		ios: d.d.constant( "iOS" ),
		android: d.d.constant( "Android" ),
		linux: d.d.constant( "Linux" ),
		osx: d.d.constant( "OSX" ),
		solaris: d.d.constant( "Solaris" ),
		freebsd: d.d.constant( "FreeBSD" )
	}
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 );
	b.a = function ( a, b, c ) {
		var e = a.isiOS() && !0 === /ipad/i.test( c ), f = a.isiOS() && !e,
			g = a.isAndroid() && 3 === a.version.major,
			h = a.isAndroid() && 4 === a.version.major,
			i = e || g || h && !0 === /mobile/i.test( c ),
			j = a.isiOS() || a.isAndroid(), k = j && !i,
			l = b.isSafari() && a.isiOS() && !1 === /safari/i.test( c );
		return {
			isiPad: d.d.constant( e ),
			isiPhone: d.d.constant( f ),
			isTablet: d.d.constant( i ),
			isPhone: d.d.constant( k ),
			isTouch: d.d.constant( j ),
			isAndroid: a.isAndroid,
			isiOS: a.isiOS,
			isWebView: d.d.constant( l )
		}
	}
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 28 ), f = function ( a, b ) {
		var c = String( b ).toLowerCase();
		return d.b.find( a, function ( a ) {
			return a.search( c )
		} )
	}, g = function ( a, b ) {
		return f( a, b ).map( function ( a ) {
			var c = e.a.detect( a.versionRegexes, b );
			return { current: a.name, version: c }
		} )
	}, h = function ( a, b ) {
		return f( a, b ).map( function ( a ) {
			var c = e.a.detect( a.versionRegexes, b );
			return { current: a.name, version: c }
		} )
	};
	b.a = { detectBrowser: g, detectOs: h }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
		f = function ( a ) {
			return function ( b ) {
				return d.l.contains( b, a )
			}
		}, g = [ {
			name: "Edge",
			versionRegexes: [ /.*?edge\/ ?([0-9]+)\.([0-9]+)$/ ],
			search: function ( a ) {
				return d.l.contains( a, "edge/" ) && d.l.contains( a, "chrome" ) && d.l.contains( a, "safari" ) && d.l.contains( a, "applewebkit" )
			}
		}, {
			name: "Chrome",
			versionRegexes: [ /.*?chrome\/([0-9]+)\.([0-9]+).*/, e ],
			search: function ( a ) {
				return d.l.contains( a, "chrome" ) && !d.l.contains( a, "chromeframe" )
			}
		}, {
			name: "IE",
			versionRegexes: [ /.*?msie\ ?([0-9]+)\.([0-9]+).*/, /.*?rv:([0-9]+)\.([0-9]+).*/ ],
			search: function ( a ) {
				return d.l.contains( a, "msie" ) || d.l.contains( a, "trident" )
			}
		}, {
			name: "Opera",
			versionRegexes: [ e, /.*?opera\/([0-9]+)\.([0-9]+).*/ ],
			search: f( "opera" )
		}, {
			name: "Firefox",
			versionRegexes: [ /.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/ ],
			search: f( "firefox" )
		}, {
			name: "Safari",
			versionRegexes: [ e, /.*?cpu os ([0-9]+)_([0-9]+).*/ ],
			search: function ( a ) {
				return (d.l.contains( a, "safari" ) || d.l.contains( a, "mobile/" )) && d.l.contains( a, "applewebkit" )
			}
		} ], h = [ {
			name: "Windows",
			search: f( "win" ),
			versionRegexes: [ /.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/ ]
		}, {
			name: "iOS",
			search: function ( a ) {
				return d.l.contains( a, "iphone" ) || d.l.contains( a, "ipad" )
			},
			versionRegexes: [ /.*?version\/\ ?([0-9]+)\.([0-9]+).*/, /.*cpu os ([0-9]+)_([0-9]+).*/, /.*cpu iphone os ([0-9]+)_([0-9]+).*/ ]
		}, {
			name: "Android",
			search: f( "android" ),
			versionRegexes: [ /.*?android\ ?([0-9]+)\.([0-9]+).*/ ]
		}, {
			name: "OSX",
			search: f( "os x" ),
			versionRegexes: [ /.*?os\ x\ ?([0-9]+)_([0-9]+).*/ ]
		}, {
			name: "Linux",
			search: f( "linux" ),
			versionRegexes: []
		}, {
			name: "Solaris",
			search: f( "sunos" ),
			versionRegexes: []
		}, { name: "FreeBSD", search: f( "freebsd" ), versionRegexes: [] } ];
	b.a = { browsers: d.d.constant( g ), oses: d.d.constant( h ) }
}, function ( a, b, c ) {
	"use strict"
}, function ( a, b, c ) {
	"use strict";
	c( 5 )
}, function ( a, b, c ) {
	"use strict";
	c( 5 )
}, function ( a, b, c ) {
	"use strict";
	var d = c( 5 ), e = function ( a ) {
		d.a.getOrDie( "requestAnimationFrame" )( a )
	}, f = function ( a ) {
		return d.a.getOrDie( "atob" )( a )
	};
	b.a = { atob: f, requestAnimationFrame: e }
}, function ( a, b, c ) {
	"use strict";
	c( 5 )
}, function ( a, b, c ) {
	"use strict";
	c( 5 )
}, function ( a, b, c ) {
	"use strict";
	var d = function ( a, b ) {
		var c = [], d = function ( a ) {
			return c.push( a ), b( a )
		}, e = b( a );
		do {
			e = e.bind( d )
		} while ( e.isSome() );
		return c
	};
	b.a = { toArray: d }
}, function ( a, b, c ) {
	"use strict";
	c( 0 ), c( 19 ), c( 2 )
}, function ( a, b, c ) {
	"use strict";
	c( 0 ), c( 4 ), c( 1 ), c( 30 ), c( 3 ), c( 2 )
}, function ( a, b, c ) {
	"use strict";
	c( 0 ), c( 4 ), c( 3 )
}, function ( a, b, c ) {
	"use strict";
	c( 11 ), c( 1 ), c( 16 ), c( 2 )
}, function ( a, b, c ) {
	"use strict";
	c( 11 ), c( 1 ), c( 16 ), c( 20 ), c( 21 ), c( 3 )
}, function ( a, b, c ) {
	"use strict";
	var d = c( 51 ), e = function ( a ) {
		return 0 === a.button
	}, f = function ( a ) {
		return void 0 === a.buttons || 0 != (1 & a.buttons)
	}, g = function ( a ) {
		return 6 !== a.mozInputSource && 0 !== a.mozInputSource && (void 0 === a.isTrusted || !0 === a.isTrusted)
	}, h = function ( a, b ) {
		return {
			bind: function ( c, e ) {
				return d.a.bind( c, a, b, e )
			}
		}
	};
	h( "click", g ), h( "mousedown", e ), h( "mouseover", f ), h( "mouseup", e )
}, function ( a, b, c ) {
	"use strict";
	c( 19 ), c( 1 ), c( 2 )
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 );
	c( 9 ), c( 4 ), c( 19 ), c( 52 ), c( 1 ), c( 53 ), c( 31 ), c( 55 ), c( 126 ), c( 2 ), d.h.none()
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 4 ), f = [], g = function ( a, b ) {
		return { element: a, unbind: b }
	}, h = function ( a ) {
		return d.b.findIndex( f, function ( b ) {
			return e.a.eq( b.element, a )
		} ).getOr( -1 )
	}, i = function ( a, b ) {
		if ( -1 === h( a ) ) {
			var c = b();
			f.push( g( a, c ) )
		}
	}, j = function ( a ) {
		var b = h( a );
		return -1 === b ? d.h.none() : d.h.some( f[ b ] )
	}, k = function ( a ) {
		var b = h( a );
		if ( -1 !== b ) {
			var c = f[ b ];
			f.splice( b, 1 ), c.unbind()
		}
	};
	b.a = { begin: i, query: j, end: k }
}, function ( a, b, c ) {
	"use strict";
	c( 19 ), c( 56 )
}, function ( a, b, c ) {
	"use strict";
	var d = c( 6 ), e = c( 58 );
	Object( e.a )( d.a.isComment, "comment" )
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 9 ), f = c( 1 ), g = (c( 2 ), function ( a ) {
		for ( var b = []; null !== a.nextNode(); ) b.push( f.a.fromDom( a.currentNode ) );
		return b
	}), h = function ( a ) {
		try {
			return g( a )
		} catch ( a ) {
			return []
		}
	}, i = e.c.detect().browser;
	i.isIE() || i.isEdge(), d.d.constant( d.d.constant( !0 ) )
}, function ( a, b, c ) {
	"use strict";
	var d = (c( 10 ), c( 61 )), e = (c( 6 ), function ( a ) {
		return function ( b ) {
			return a
		}
	});
	d.a.onDirection( "left", "right" ), d.a.onDirection( "right", "left" ), e( "justify" ), e( "center" ), e( "match-parent" )
}, function ( a, b, c ) {
	"use strict";
	c( 11 )
}, function ( a, b, c ) {
	"use strict";
	c( 22 )
}, function ( a, b, c ) {
	"use strict";
	c( 10 )
}, function ( a, b, c ) {
	"use strict";
	c( 0 ), c( 10 ), c( 33 )
}, function ( a, b, c ) {
	"use strict";
	c( 1 ), c( 59 ), c( 16 ), c( 20 ), c( 21 ), c( 3 )
}, function ( a, b, c ) {
	"use strict";
	c( 36 ), c( 64 )
}, function ( a, b, c ) {
	"use strict"
}, function ( a, b, c ) {
	"use strict"
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 );
	c( 4 ), c( 14 ), c( 37 ), c( 22 ), c( 3 ), d.m.immutable( "ancestor", "descendants", "element", "index" ), d.m.immutable( "parent", "children", "element", "index" )
}, function ( a, b, c ) {
	"use strict";
	c( 0 ), c( 4 ), c( 30 )
}, function ( a, b, c ) {
	"use strict";
	c( 22 )
}, function ( a, b, c ) {
	"use strict";
	c( 0 ), c( 1 )
}, function ( a, b, c ) {
	"use strict";
	c( 4 ), c( 38 ), c( 39 )
}, function ( a, b, c ) {
	"use strict";
	c( 0 ), c( 48 ), c( 1 ), c( 60 ), c( 23 ), c( 41 ), c( 42 ), c( 145 ), c( 149 ), c( 150 ), c( 4 )
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 1 ), f = c( 3 ), g = c( 23 ), h = c( 146 ),
		i = c( 148 ), j = function ( a, b, c ) {
			return d.h.from( a.dom().caretPositionFromPoint( b, c ) ).bind( function ( b ) {
				if ( null === b.offsetNode ) return d.h.none();
				var c = a.dom().createRange();
				return c.setStart( b.offsetNode, b.offset ), c.collapse(), d.h.some( c )
			} )
		}, k = function ( a, b, c ) {
			return d.h.from( a.dom().caretRangeFromPoint( b, c ) )
		}, l = function ( a, b, c, d ) {
			var e = a.dom().createRange();
			e.selectNode( b.dom() );
			var f = e.getBoundingClientRect(),
				g = Math.max( f.left, Math.min( f.right, c ) ),
				i = Math.max( f.top, Math.min( f.bottom, d ) );
			return h.a.locate( a, b, g, i )
		}, m = function ( a, b, c ) {
			return e.a.fromPoint( a, b, c ).bind( function ( d ) {
				var e = function () {
					return i.a.search( a, d, b )
				};
				return 0 === f.a.children( d ).length ? e() : l( a, d, b, c ).orThunk( e )
			} )
		},
		n = document.caretPositionFromPoint ? j : document.caretRangeFromPoint ? k : m,
		o = function ( a, b, c ) {
			var d = e.a.fromDom( a.document );
			return n( d, b, c ).map( function ( a ) {
				return g.a.range( e.a.fromDom( a.startContainer ), a.startOffset, e.a.fromDom( a.endContainer ), a.endOffset )
			} )
		};
	b.a = { fromPoint: o }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 6 ), f = c( 3 ), g = c( 66 ), h = c( 147 ),
		i = function ( a, b, c, e ) {
			var h = a.dom().createRange(), i = f.a.children( b );
			return d.i.findMap( i, function ( b ) {
				return h.selectNode( b.dom() ), g.a.inRect( h.getBoundingClientRect(), c, e ) ? j( a, b, c, e ) : d.h.none()
			} )
		}, j = function ( a, b, c, d ) {
			return (e.a.isText( b ) ? h.a.locate : i)( a, b, c, d )
		}, k = function ( a, b, c, d ) {
			var e = a.dom().createRange();
			e.selectNode( b.dom() );
			var f = e.getBoundingClientRect(),
				g = Math.max( f.left, Math.min( f.right, c ) ),
				h = Math.max( f.top, Math.min( f.bottom, d ) );
			return j( a, b, g, h )
		};
	b.a = { locate: k }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 35 ), f = c( 66 ), g = function ( a, b, c, d, g ) {
		var h = function ( c ) {
				var d = a.dom().createRange();
				return d.setStart( b.dom(), c ), d.collapse( !0 ), d
			}, i = function ( a ) {
				return h( a ).getBoundingClientRect()
			}, j = e.a.get( b ).length,
			k = f.a.searchForPoint( i, c, d, g.right, j );
		return h( k )
	}, h = function ( a, b, c, e ) {
		var h = a.dom().createRange();
		h.selectNode( b.dom() );
		var i = h.getClientRects();
		return d.i.findMap( i, function ( a ) {
			return f.a.inRect( a, c, e ) ? d.h.some( a ) : d.h.none()
		} ).map( function ( d ) {
			return g( a, b, c, e, d )
		} )
	};
	b.a = { locate: h }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 3 ), f = c( 39 ), g = function ( a, b ) {
		return b - a.left < a.right - b
	}, h = function ( a, b, c ) {
		var d = a.dom().createRange();
		return d.selectNode( b.dom() ), d.collapse( c ), d
	}, i = function ( a, b, c ) {
		var d = a.dom().createRange();
		d.selectNode( b.dom() );
		var e = d.getBoundingClientRect(), i = g( e, c );
		return (!0 === i ? f.a.first : f.a.last)( b ).map( function ( b ) {
			return h( a, b, i )
		} )
	}, j = function ( a, b, c ) {
		var e = b.dom().getBoundingClientRect(), f = g( e, c );
		return d.h.some( h( a, b, f ) )
	}, k = function ( a, b, c ) {
		return (0 === e.a.children( b ).length ? j : i)( a, b, c )
	};
	b.a = { search: k }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 1 ), f = c( 6 ), g = c( 37 ), h = c( 18 ),
		i = c( 41 ), j = c( 42 ), k = function ( a, b, c, e ) {
			var f = i.a.create( a ), j = h.a.is( b, e ) ? [ b ] : [],
				k = j.concat( g.a.descendants( b, e ) );
			return d.b.filter( k, function ( a ) {
				return i.a.selectNodeContentsUsing( f, a ), i.a.isWithin( c, f )
			} )
		}, l = function ( a, b, c ) {
			var d = j.a.asLtrRange( a, b ),
				g = e.a.fromDom( d.commonAncestorContainer );
			return f.a.isElement( g ) ? k( a, g, d, c ) : []
		};
	b.a = { find: l }
}, function ( a, b, c ) {
	"use strict";
	var d = c( 0 ), e = c( 1 ), f = c( 6 ), g = c( 23 ), h = c( 40 ),
		i = function ( a, b ) {
			var c = f.a.name( a );
			return "input" === c ? h.a.after( a ) : d.b.contains( [ "br", "img" ], c ) ? 0 === b ? h.a.before( a ) : h.a.after( a ) : h.a.on( a, b )
		}, j = function ( a, b ) {
			var c = a.fold( h.a.before, i, h.a.after ),
				d = b.fold( h.a.before, i, h.a.after );
			return g.a.relative( c, d )
		}, k = function ( a, b, c, d ) {
			var e = i( a, b ), f = i( c, d );
			return g.a.relative( e, f )
		}, l = function ( a ) {
			return a.match( {
				domRange: function ( a ) {
					var b = e.a.fromDom( a.startContainer ),
						c = e.a.fromDom( a.endContainer );
					return k( b, a.startOffset, c, a.endOffset )
				}, relative: j, exact: k
			} )
		};
	b.a = {
		beforeSpecial: i,
		preprocess: l,
		preprocessRelative: j,
		preprocessExact: k
	}
}, function ( a, b, c ) {
	"use strict"
}, function ( a, b, c ) {
	"use strict";
	c( 0 )
}, function ( a, b, c ) {
	"use strict";
	var d = (c( 0 ), c( 9 )), e = (c( 2 ), d.c.detect());
	e.deviceType.isTouch, e.deviceType.isAndroid
}, function ( a, b, c ) {
	a.exports = c( 155 )
}, function ( a, b, c ) {
	"use strict";

	function d( a ) {
		return a && a.__esModule ? a : { default: a }
	}

	function e( a, b ) {
		var c = a.startContainer, d = a.startOffset, e = a.endContainer,
			f = a.endOffset;
		return {
			start: l.fromNode( c, b ),
			end: l.fromNode( e, b ),
			startOffset: d,
			endOffset: f
		}
	}

	function f( startXPath, startOffset, endXPath, endOffset, containerNode ) {
		function f( a ) {
			var b = new Error( "The " + a + " node was not found." );
			return b.name = "NotFoundError", b
		}

		function g( a ) {
			var b = new Error( "There is no text at the requested " + a + " offset." );
			return b.name = "IndexSizeError", b
		}

		var i = (0, h.default)( containerNode ), startNode = l.toNode( startXPath, containerNode );
		if ( null === startNode ) throw f( "start" );
		var n = i.createNodeIterator( startNode, m ), o = startOffset - (0, j.default)( n, startOffset );
		if ( startNode = n.referenceNode, !n.pointerBeforeReferenceNode ) {
			if ( o > 0 ) throw g( "start" );
			o += startNode.length
		}
		var endNode = l.toNode( endXPath, containerNode );
		if ( null === endNode ) throw f( "end" );

		var q = i.createNodeIterator( endNode, m ), r = endOffset - (0, j.default)( q, endOffset );
		if ( endNode = q.referenceNode, !q.pointerBeforeReferenceNode ) {
			if ( r > 0 ) throw g( "end" );
			r += endNode.length
		}
		var s = i.createRange();
		return s.setStart( startNode, o ), s.setEnd( endNode, r ), s
	}

	b.__esModule = !0, b.fromRange = e, b.toRange = f;
	var g = c( 67 ), h = d( g ), i = c( 156 ), j = d( i ), k = c( 160 ),
		l = function ( a ) {
			if ( a && a.__esModule ) return a;
			var b = {};
			if ( null != a ) for ( var c in a ) Object.prototype.hasOwnProperty.call( a, c ) && (b[ c ] = a[ c ]);
			return b.default = a, b
		}( k ), m = 4
}, function ( a, b, c ) {
	a.exports = c( 157 ).default
}, function ( a, b, c ) {
	"use strict";

	function d( a ) {
		return a && a.__esModule ? a : { default: a }
	}

	function e( a, b ) {
		if ( a.whatToShow !== o ) throw new Error( m );
		var c = 0, d = a.referenceNode, e = null;
		if ( f( b ) ) e = {
			forward: function () {
				return c < b
			}, backward: function () {
				return c > b
			}
		}; else {
			if ( !g( b ) ) throw new Error( n );
			e = {
				forward: h( d, b ) ? function () {
					return !1
				} : function () {
					return d !== b
				}, backward: function () {
					return d != b || !a.pointerBeforeReferenceNode
				}
			}
		}
		for ( ; e.forward() && null !== (d = a.nextNode()); ) c += d.nodeValue.length;
		for ( ; e.backward() && null !== (d = a.previousNode()); ) c -= d.nodeValue.length;
		return c
	}

	function f( a ) {
		return !isNaN( parseInt( a ) ) && isFinite( a )
	}

	function g( a ) {
		return a.nodeType === p
	}

	function h( a, b ) {
		if ( a === b ) return !1;
		for ( var c = null, d = [ a ].concat( (0, j.default)( a ) ).reverse(), e = [ b ].concat( (0, j.default)( b ) ).reverse(); d[ 0 ] === e[ 0 ]; ) c = d.shift(), e.shift();
		return d = d[ 0 ], e = e[ 0 ], (0, l.default)( c.childNodes, d ) > (0, l.default)( c.childNodes, e )
	}

	b.__esModule = !0, b.default = e;
	var i = c( 158 ), j = d( i ), k = c( 159 ), l = d( k ),
		m = "Argument 1 of seek must use filter NodeFilter.SHOW_TEXT.",
		n = "Argument 2 of seek must be a number or a Text Node.", o = 4, p = 3
}, function ( a, b ) {
	function c( a, b ) {
		var c = [];
		b = b || d;
		do {
			c.push( a ), a = a.parentNode
		} while ( a && a.tagName && b( a ) );
		return c.slice( 1 )
	}

	function d( a ) {
		return !0
	}

	a.exports = c
}, function ( a, b, c ) {
	"use strict";
	a.exports = function ( a, b, c ) {
		c = c || 0;
		if ( null == a ) return -1;
		var d = a.length, e = c < 0 ? d + c : c;
		if ( e >= a.length ) return -1;
		for ( ; e < d; ) {
			if ( a[ e ] === b ) return e;
			e++
		}
		return -1
	}
}, function ( a, b, c ) {
	a.exports = c( 161 )
}, function ( a, b, c ) {
	"use strict";

	function d( a ) {
		return a && a.__esModule ? a : { default: a }
	}

	function fromNode( a ) {
		var b = arguments.length <= 1 || void 0 === arguments[ 1 ] ? null : arguments[ 1 ];
		if ( void 0 === a ) throw new Error( 'missing required parameter "node"' );
		b = b || (0, n.default)( a );
		for ( var c = "/"; a !== b; ) {
			if ( !a ) {
				throw new p.default( "The supplied node is not contained by the root node.", "InvalidNodeTypeError" )
			}
			c = "/" + g( a ) + "[" + h( a ) + "]" + c, a = a.parentNode
		}
		return c.replace( /\/$/, "" )
	}

	function toNode( path, root ) {
		var c = arguments.length <= 2 || void 0 === arguments[ 2 ] ? null : arguments[ 2 ];
		if ( void 0 === path ) throw new Error( 'missing required parameter "path"' );
		if ( void 0 === root ) throw new Error( 'missing required parameter "root"' );
		var d = (0, n.default)( root );
		root !== d && (path = path.replace( /^\//, "./" ));

		var e = d.documentElement;
		return null === c && e.lookupNamespaceURI && function () {
			var a = e.lookupNamespaceURI( null ) || r;
			c = function ( b ) {
				return { _default_: a }[ b ] || e.lookupNamespaceURI( b )
			}
		}(), i( path, root, c )
	}

	function g( a ) {
		switch ( a.nodeName ) {
			case"#text":
				return "text()";
			case"#comment":
				return "comment()";
			case"#cdata-section":
				return "cdata-section()";
			default:
				return a.nodeName.toLowerCase()
		}
	}

	function h( a ) {
		for ( var b = a.nodeName, c = 1; a = a.previousSibling; ) a.nodeName === b && (c += 1);
		return c
	}

	function i( path, root, c ) {
		try {
			return xPathEvaluate( path.replace( /\/(?!\.)([^\/:\(]+)(?=\/|$)/g, "/_default_:$1" ), root, c )
		} catch ( c ) {
			return j( path, root )
		}
	}

	function j( a, b ) {
		for ( var c = a.split( "/" ), d = b; d; ) {
			var e = c.shift();
			if ( void 0 === e ) break;
			if ( "." !== e ) {
				var f = e.split( /[\[\]]/ ), g = f[ 0 ], h = f[ 1 ];
				g = g.replace( "_default_:", "" ), h = h ? parseInt( h ) : 1, d = l( d, g, h )
			}
		}
		return d
	}

	function xPathEvaluate( path, root, c ) {
		return (0, n.default)( root ).evaluate( path, root, c, q, null ).singleNodeValue
	}

	function l( a, b, c ) {
		for ( a = a.firstChild; a && (g( a ) !== b || 0 != --c); a = a.nextSibling ) ;
		return a
	}

	b.__esModule = !0, b.fromNode = fromNode, b.toNode = toNode;
	var m = c( 67 ), n = d( m ), o = c( 162 ), p = d( o ), q = 9,
		r = "http://www.w3.org/1999/xhtml"
}, function ( a, b, c ) {
	"use strict";

	function d( a, b ) {
		if ( !(a instanceof b) ) throw new TypeError( "Cannot call a class as a function" )
	}

	b.__esModule = !0;
	var e = function a( b, c ) {
		d( this, a ), this.message = b, this.name = c, this.stack = (new Error).stack
	};
	b.default = e, e.prototype = new Error, e.prototype.toString = function () {
		return this.name + ": " + this.message
	}
}, function ( a, b, c ) {
	"use strict";
	c.d( b, "a", function () {
		return e
	} );
	var d = c( 24 ), e = function ( editor ) {
		editor.experimental.annotator.register( d.e(), {
			decorate: function ( a, b ) {
				return { attributes: { "data-mce-bogus": "1" }, classes: [ d.b() ] }
			}
		} ), editor.addCommand( d.c(), function ( b, c ) {
			var e = c.uid;
			editor.experimental.annotator.annotate( d.e(), { uid: e } )
		} ), editor.experimental.annotator.annotationChanged( d.e(), function ( b, c, e ) {
			b ? editor.fire( d.d(), { uid: e.uid } ) : editor.fire( d.f() )
		} )
	}
}, function ( a, b, loader ) {
	"use strict";
	loader.d( b, "a", function () {
		return f
	} );
	var d = loader( 2 ), e = loader( 0 ), f = function ( a, b ) {
		var c = Object( e.c )( {} ), f = e.n.last( function () {
			var d = c.get(), f = {}, g = a();
			e.b.each( g, function ( a ) {
				var c = a.uid;
				if ( d.hasOwnProperty( c ) ) {
					var e = d[ c ];
					e.start === a.xpath.start && e.startOffset === a.xpath.startOffset && e.end === a.xpath.end && e.endOffset === a.xpath.endOffset || (b( {
						uid: c,
						xpath: a.xpath
					} ), f[ c ] = a.xpath)
				} else f[ c ] = a.xpath
			} ), c.set( f )
		}, 100 ), g = new d.a( function () {
			f.throttle()
		} );
		return {
			start: function ( a ) {
				g.observe( a, {
					childList: !0,
					subtree: !0,
					attributes: !1,
					characterData: !0
				} )
			}, stop: function () {
				f.cancel(), g.disconnect()
			}
		}
	}
} ] );
