import React                                                        from 'react';
import PaymentCardInput, { PaymentCardInputProps, ValidatorResult } from './basic';


export const DEFAUT_CVV_LENGTH = 3;


export interface CardCVVInputProps extends PaymentCardInputProps<string>
{
    len?: number;
}

export default class CardCVVInput extends PaymentCardInput<string>
{
    protected className  : string  = 'payment-card-cvv';
    protected placeholder: string  = '000';

    static InputClass( ) { return 'CardCVVInput' }

    constructor( readonly props: CardCVVInputProps )
    {
        super ( props );
    }

    defaultValidator( value: string ) : ValidatorResult
    {
        const { len=DEFAUT_CVV_LENGTH } = this.props;

        if ( `${value}`.length < len )
        {
            return { success: false, message: `Min length is '${len}'` } as ValidatorResult;
        } else {
            return { success: true } as ValidatorResult;
        }
    }  

    defaultValueConverter( value: string ) : string
    {
        const { len=DEFAUT_CVV_LENGTH } = this.props;

        return ( value || '' ).replace( /[^0-9]+/gi, '' ).substring( 0, len );
    }
}