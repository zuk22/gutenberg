import { parse as syncParse } from './post.pegjs';

export const parse = ( document ) => Promise.resolve( syncParse( document ) );
