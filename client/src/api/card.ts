import { PaymentCardState } from "../components/payment-card/card";
import BasicApi             from "./basic";
import { DonateOutput }     from "./donate";


export interface CardAttributes extends PaymentCardState 
{ 
}

export interface CardOutput extends PaymentCardState 
{ 
    id         : string;
    updatedAt ?: Date|string;
    updatedat ?: Date|string;
    Donates    : DonateOutput[];
}

class CardApi extends BasicApi
{
    async create( payload: CardAttributes ) : Promise<CardOutput>
    {
        const params = Object.assign( { }, payload );
        
        const [ month, year ] = ( params.expire || '' ).split( '/' );
        
        params.expire = new Date( 2000 + Number( year ), Number( month ) - 1 ).toISOString( );

        return await this.post( '', params );
    }

    async findOrCreate( payload: CardAttributes ) : Promise<CardOutput> 
    {
        const params = Object.assign( { }, payload );
        
        const [ month, year ] = ( params.expire || '' ).split( '/' );
        
        params.expire = new Date( 2000 + Number( year ), Number( month ) - 1 ).toISOString( );

        return await this.post( 'find_or_create', params );
    }

    async getAll( ) : Promise<CardOutput[]> 
    {
        return await this.get( '' );
    }
}


export default new CardApi( '/rest/api/card' );