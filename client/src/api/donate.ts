import { PaymentCardState } from "../components/payment-card/card";
import { DonateFormState } from "../forms";
import BasicApi            from "./basic";


export interface DonateAttributes 
{ 
    card_id: string;
    curency: string;
    amount : number;
}

export interface DonateOutput extends DonateAttributes
{
    id         : string;
    updatedAt ?: Date;
    updatedat ?: Date;
}

class DonateApi extends BasicApi
{
    async create( payload: DonateAttributes ) : Promise<DonateOutput>
    {
        const params = Object.assign( { }, payload );

        return await this.post( '', params );
    }

    async getAll( ) : Promise<DonateOutput[]> 
    {
        return await this.get( '' );
    }
}


export default new DonateApi( '/rest/api/donate' );