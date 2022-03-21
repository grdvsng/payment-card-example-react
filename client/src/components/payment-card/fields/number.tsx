import React                                                        from 'react';
import PaymentCardInput, { PaymentCardInputProps, ValidatorResult } from './basic'


export const DEFAUT_CARD_NUMBER_LENGTH = 16;


export interface CardNumberInputProps extends PaymentCardInputProps<string>
{
    minLength    ?: number;
    maxLength    ?: number;
    determinator ?: string;
}

export default class CardNumberInput extends PaymentCardInput<string>
{
    protected className  : string = 'payment-card-number';
    protected placeholder: string = '0000 0000 0000 0000';
    
    static InputClass( ) { return 'CardNumberInput' }

    constructor( readonly props: CardNumberInputProps )
    {
        super ( props );
    }

    defaultValueConverter( value: string ) : string
    {
        const { minLength: min=DEFAUT_CARD_NUMBER_LENGTH } = this.props;
        const { maxLength: max=min }                       = this.props;

        const splited = ( value || '' ).replace( /[^0-9]+/gi, '' ).substring( 0, max ).split( '' );
        
        const { determinator=' ' } = this.props;

        let result = '';

        for ( let i=0; i < splited.length; i++ )
        {
            if ( ( i+1 ) % 4 || i+1 === max )
            {
                result += `${splited[i]}`;
            } else {
                result += `${splited[i]}${determinator}`;
            }
        }

        return result.trim( );
    }  

    defaultValidator( value: string ) : ValidatorResult
    {
        value = value.replace( /[^0-9]+/gi, '' );
        const { minLength: min=DEFAUT_CARD_NUMBER_LENGTH } = this.props;
        const { maxLength: max=min                       } = this.props;

        if ( `${value}`.length < min )
        {
            return { success: false, message: `Min length is '${min}'` } as ValidatorResult;
        } else if ( `${value}`.length > max ) {
            return { success: false, message: `Max length is '${max}'` } as ValidatorResult;
        } else {
            return { success: true } as ValidatorResult;
        }
    } 
}