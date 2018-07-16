import { parse as syncParse } from './post.pegjs';

export const parse = ( postContent ) => Promise.resolve( syncParse( postContent ) );
