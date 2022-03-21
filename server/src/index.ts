import express                          from 'express'
import { configure, PORT, STATIC_ROOT } from './config';
import routes                           from './routes';
import path                             from 'path';

const app = express( );

configure( app );


app.use( '/rest/api/', routes );

app.listen( PORT, ( ) => console.log( 'http://localhost:' + PORT ) );

app.get( '/*', ( _, res ) =>
{
    res.sendFile(path.join( STATIC_ROOT, 'index.html'), function (err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })