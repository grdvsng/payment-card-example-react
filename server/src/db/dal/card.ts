import { Card, CardInput, CardOuput       } from '../models';
import { Donate, DonateInput, DonateOuput } from '../models';


export async function create( payload: CardInput ): Promise<CardOuput> 
{
    const card = await Card.create( payload )

    return card;
}

export async function findOrCreate( payload: CardInput ): Promise<CardOuput> 
{
    const [ card ] = await Card.findAll( { where: { ...payload } } )

    if ( card )
    {
        return card;
    } else {
        return await create( payload );
    }
}


export async function findAll( ): Promise<CardOuput[]> 
{
    const result = await Card.findAll( { raw: false, include: [ { model: Donate } ]} );

    return result;
}

export async function find( id: number ): Promise<CardOuput> 
{
    const donate = await Card.findByPk( id )
    
    if ( !donate ) 
    {
        throw new Error('not found')
    }

    return donate
}


