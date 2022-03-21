import React                                 from 'react';
import PaymentCardInput, { ValidatorResult } from './basic';
import { Select }                            from 'antd';


export default class CardExpireInput extends PaymentCardInput<string>
{
    protected className  : string = 'payment-card-expire';
    protected placeholder: string = '01/20';
    
    static InputClass( ) { return 'CardExpireInput' }

    defaultValidator( value: string ) : ValidatorResult
    {
        const [ month, year ] = value.split( '/' );

        if ( Number.parseInt( month ) > 12 || Number.parseInt( month ) < 1 )
        {
            return { success: false, message: `Incorrect month value` };
        } else if ( month && year ) {
            const now    = new Date( );
            const expire = new Date( Number.parseInt( '20' + year ), Number.parseInt( month )-1 );
            
            if ( now > expire )
            {
                return { success: false, message: `Expired card` };  
            }

            return { success: true };
        } else {
            return { success: false, message: `Can't be null` };
        }
    }

    defaultValueConverter( value: string ) : string
    {
        value = ( value || '' ).replace( /[^0-9]+/gi, '' );

        let result = '';

        for ( let i=0; i < 4 && i < value.length; i++ )
        {
            if ( i == 2 )
            {
                result += `/${value[i]}`;
            } else {
                result += `${value[i]}`;
            }
        }

        return result;
    }
}