import * as path                 from 'path';
import express, { type Express } from 'express'
import bodyParser                from 'body-parser';
import dbInit                    from './db/init';

export const PORT        = '5000';
export const ROOT_DIR    = path.dirname( path.dirname( __dirname ) );
export const STATIC_ROOT = path.join( ROOT_DIR, 'client', 'build' );
export const STATIC_DIRS = [ 
    STATIC_ROOT,
    path.join( STATIC_ROOT, 'static' )
];

export function configure( app: Express ) : void
{
    dbInit( );

    app.use( bodyParser.json() )

    STATIC_DIRS.forEach( dir =>
        app.use( '/static', express.static( dir ) )
    )
}
