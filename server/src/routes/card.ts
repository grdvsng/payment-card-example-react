import { Request, Response, Router } from 'express'
import * as Card                     from '../db/dal/card';


const CardRouter = Router( )

CardRouter.get( ':/id',  async ( req: Request, res: Response ) => 
{
    const id     = Number( req.params.id );
    const result = await Card.find( id );

    if ( result )
    {
        return res.status( 200 ).send( result );
    } else {
        return res.status( 404 ).send( { error: 'Not found' } );
    }
} )

CardRouter.get( '/',  async ( _, res: Response ) => 
{
    const result = await Card.findAll( );
    
    return res.status(200).send( result );
} )

CardRouter.post( '/', async ( req: Request, res: Response ) => {
    try {
        const result = await Card.create( req.body );

        return res.status( 200 ).send( result );
    } catch ( error: unknown ) {
        return res.status( 500 ).send( { error: `${error}` } );
    }
} )

CardRouter.post( '/find_or_create', async ( req: Request, res: Response ) => {
    try {
        const result = await Card.findOrCreate( req.body );

        return res.status( 200 ).send( result );
    } catch ( error: unknown ) {
        return res.status( 500 ).send( { error: `${error}` } );
    }
} )

export default CardRouter;