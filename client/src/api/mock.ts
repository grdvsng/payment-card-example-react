import { choice, randint  } from "../utils";
import { v4 as uuidv4     } from 'uuid';
import { PaymentCardState } from "../components/payment-card/card";


class FakeResponse
{
    constructor(
        public readonly status: {
                code        : 200|500;
                description?: string;
            },
        public readonly uuid?: string
    ) { }
    
    static async random( ) : Promise<FakeResponse>
    {
        return new Promise( ( resolve, reject ) => {
            setTimeout( () => {
                const rand = choice( [ 0, 1, 2, 3, 4, 5 ]  );
     
                if ( rand == 0 ) 
                {
                    resolve( new FakeResponse( { code: 500, description: 'Server Error' } ) );
                } else if ( rand == 1 ) {
                    reject( 'Inner Error' );
                } else {
                    resolve( new FakeResponse( { code: 200, description: '' },  uuidv4( ) ) );
                }
            }, randint( 200, 700 ) )
        } );
    }
}


export default class Api
{
    static sendDonate( data: PaymentCardState, curency: string, amount?: number ) : Promise<FakeResponse>
    {
        const [ month, year ] = ( data.expire || '' ).split( '/' );
        
        return FakeResponse.random( )
    }
}