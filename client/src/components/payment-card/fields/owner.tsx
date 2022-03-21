import React                                                        from 'react';
import PaymentCardInput, { ValidatorResult } from './basic'


export default class CardOwnerInput extends PaymentCardInput<string>
{
    protected className  : string = 'payment-card-owner';
    protected placeholder: string = 'Name Surname';

    static InputClass( ) { return 'CardOwnerInput' }

    defaultValidator( value: string ) : ValidatorResult
    {
        if ( `${value}`.replace( /\s+/gi, '' ).length === 0 )
        {
            return { success: false, message: `Value owner can't be null` } as ValidatorResult;
        } else {
            return { success: true } as ValidatorResult;
        }
    } 
}

