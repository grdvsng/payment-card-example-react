import React                                   from 'react';
import BasicComponent, { BasicComponentProps } from '../components/basic';
import PaymentCard, { PaymentCardState }                             from '../components/payment-card/card';
import CardCVVInput                            from '../components/payment-card/fields/cvv';
import CardExpireInput                         from '../components/payment-card/fields/expire';
import CardNumberInput                         from '../components/payment-card/fields/number';
import CardOwnerInput                          from '../components/payment-card/fields/owner';
import { Button, notification, Tag, Input }    from 'antd';
import { AiOutlineDollarCircle }               from 'react-icons/ai';

import './styles.scss';


export interface DonateFormNotification
{ 
    title   ?: string; 
    message  : string; 
    onClick ?: ( ) => void; 
    type     : string;
}

export interface  DonateFormProps extends BasicComponentProps
{
    title                 ?: string;
    theme                 ?: string;
    cardNumberPlaceholder ?: string;
    cardOwnerPlaceholder  ?: string;
    cardCVVPlaceholder    ?: string;
    cardExpirePlaceholder ?: string;
    onSubmit              ?: ( data: PaymentCardState, curency: string, amount?: number ) => void;
    submitTitle           ?: string;
    loading               ?: boolean;
    notification          ?: DonateFormNotification;
    amount                ?: number;
    curency               ?: '$';
    amountRender          ?: ( amount: number, curency: string, onChange: ( value: number ) => void ) => JSX.Element;
}

export interface DonateFormState 
{
    submitAvaible: boolean; 
    data         : PaymentCardState;
    amount       : number;
}

export class DonateStandardForm extends BasicComponent
{
    state: DonateFormState = { submitAvaible: false, data: { }, amount: 1 };
    
    constructor( readonly props: DonateFormProps )
    {
        super( props );
    }

    onChange( submitAvaible: boolean, data: PaymentCardState )
    {
        this.setState( { submitAvaible, data } );
    }

    render( ) : JSX.Element 
    {
        const { 
            title                 = 'Donate',
            theme                 = 'standard',
            cardNumberPlaceholder = '0000 0000 0000 0000',
            cardOwnerPlaceholder  = 'Surname Firstname',
            cardCVVPlaceholder    = 'cvv',
            cardExpirePlaceholder = '01/21',
            submitTitle           = 'Send',
            className             = '',
            curency               = '$',
            amountRender
        } = this.props;

        return ( <div className={ "payment-card-container " + className + ( this.props.loading ? ' payment-card-container-loading':'' ) }>
            <PaymentCard
                title   ={ title }
                theme   ={ theme }
                onChange={ ( valide, data ) => this.onChange( valide, data ) }
            >
                <CardNumberInput name="number" placeholder={cardNumberPlaceholder} key={this.props.key + '-1'}/>
                <CardOwnerInput  name="owner"  placeholder={cardOwnerPlaceholder}  key={this.props.key + '-2'}/>
                <span className="expire-block">
                    <CardExpireInput name="expire" placeholder={cardExpirePlaceholder}               key={this.props.key + '-3'}/>
                    <CardCVVInput    name="cvv"    placeholder={cardCVVPlaceholder   } hidden={true} key={this.props.key + '-4'}/>
                </span>
            </PaymentCard>
            <div className= {'amount-block-'+theme }>
                { !amountRender ? ( this.props.amount ? [ this.props.amount ]:[ 1, 10, 100, 500, 1000 ] ).map( ( count, key ) => 
                    <Tag
                        onClick  ={ ( ) => this.setState( { amount: count } )}
                        key      ={key} 
                        className={ 'amount-span-' + theme + ( this.state.amount === count ? ' amount-span-' + theme + '-active':'' )}
                    >
                        {count + curency }
                    </Tag>
                    ):amountRender( this.state.amount, curency, ( amount ) => this.setState( { amount } ) ) }
            </div>
            
            <Button
                type     ="primary"
                className={ 'submit-button-' + theme }
                disabled ={ !this.state.submitAvaible }
                onClick  ={ ( ) => this.props.onSubmit && this.props.onSubmit( this.state.data, curency, this.state.amount ) }
            > 
                {submitTitle}
            </Button>
            { 
                //@ts-ignore
                this.props.notification && notification[this.props.notification.type]( this.props.notification ) 
            }
        </div> )
    }
}