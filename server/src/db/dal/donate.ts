import { Donate, DonateInput, DonateOuput } from '../models';


export async function create( payload: DonateInput ): Promise<DonateOuput> 
{
    const donate = await Donate.create( payload )

    return donate;
}

export async function findAll( ): Promise<DonateOuput[]> 
{
    const result = await Donate.findAll( { raw: true, nest: true } );

    return result;
}

export async function find( id: number ): Promise<DonateOuput|null> 
{
    const donate = await Donate.findByPk( id );

    return donate;
}

