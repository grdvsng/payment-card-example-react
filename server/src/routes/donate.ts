import { Request, Response, Router } from 'express'
import * as Donate                   from '../db/dal/donate';


const DonateRouter = Router( )

DonateRouter.get( ':/id',  async ( req: Request, res: Response ) => 
{
    const id     = Number( req.params.id )
    const result = await Donate.find( id )

    if ( result )
    {
        return res.status(200).send( result );
    } else {
        return res.status( 404 ).send( { error: 'Not found' } );
    }
} )

DonateRouter.get( '/',  async ( _, res: Response ) => 
{
    const result = await Donate.findAll( );

    return res.status(200).send( result );
} )

DonateRouter.post( '/', async ( req: Request, res: Response ) => {
    try {
        if ( !req.body.card_id )
        {
            throw new Error( 'card_id is required' );
        }

        const result = await Donate.create( req.body );

        return res.status( 200 ).send( result );
    } catch ( error: unknown ) {
        return res.status( 500 ).send( { error: `${error}` } );
    }
} )

export default DonateRouter;