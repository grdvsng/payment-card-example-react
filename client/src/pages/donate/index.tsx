import React                                          from 'react';
import { CardApi, DonateApi }                         from '../../api';
import { PaymentCardState }                           from '../../components/payment-card/card';
import { DonateFormNotification, DonateStandardForm } from '../../forms';


export default class DonatePage extends React.Component
{
    state: {
        error   ?: string|null;
        uuid    ?: string;
        loading ?: boolean;
    } = { };

    async onSubmit( data: PaymentCardState, curency: string, amount?: number ) : Promise<void>
    {
        await this.setState( { loading: true } );

        try {
            const card_id = ( await CardApi.findOrCreate( data ) ).id;
            const donate  = await DonateApi.create( { card_id, amount: amount || 0, curency } )
            
            this.setState( { error: null, uuid: donate.id } );
        } catch( error: unknown ) {
            this.setState( { error: `${error}`, uuid: null } );
        } finally {
            this.setState( { loading: false } );
        }
    }

    private get notification( ) : DonateFormNotification | undefined
    {
        const { error } = this.state;
        
        if ( error  )
        {
            return  new Object( { 
                key : 1,
                type: 'error',
                title: 'Error', 
                message: `${error}`
            } ) as DonateFormNotification;
        } else if ( this.state.uuid ) {
            return new Object( { 
                key : 1,
                type: 'info',
                title: 'Success', 
                message: `Donate recived, id='${this.state.uuid}'`
            } ) as DonateFormNotification;
        }
    }
    render( ) : JSX.Element
    {
        return (
            <DonateStandardForm
                onSubmit    ={ ( data, curency, amount ) => this.onSubmit( data, curency, amount ) }
                loading     ={ this.state.loading }
                notification={ this.notification  }
            /> 
        );
    }
}