import React                                   from 'react';
import { Card  }                               from 'antd';
import BasicComponent, { BasicComponentProps } from '../basic';


import './themes/standard.scss';


export interface PaymentCardState
{
    owner  ?: string;
    number ?: string;
    expire ?: string;
    cvv    ?: string;
}

export interface PaymentCardProps extends BasicComponentProps
{
    title   ?: string | JSX.Element;
    theme   ?: string;
    onChange?: ( success: boolean, data: PaymentCardState ) => void;
}


export default class PaymentCard extends BasicComponent
{
    private requiredFields: Set<string>=new Set( );

    constructor( readonly props: PaymentCardProps  )
    {
        super( props );
    }

    private async onFieldChange( fieldName: string, value: string|null, isvalide: boolean=true )
    {
        await this.setState( { [fieldName]: value })
        
        const state = this.state as Record<string, string | null | undefined | boolean>;
        
        if ( isvalide )
        {
            const fieldsNames = [ 'owner', 'number', 'expire', 'cvv' ];
            
            for ( let i=0; i < fieldsNames.length; i++ )
            {
                const fieldName = fieldsNames[i];
                const value     = state[fieldName];

                if ( !value && this.requiredFields.has( fieldName ) )
                {
                    return this.onChange( false ); 
                }
            }

            return this.onChange( true );
        } else {
            return this.onChange( false );
        }
    }

    private onChange( success: boolean )
    {
        if ( this.props.onChange )
        {
            this.props.onChange( success, this.state );
        } else {
            console.log( success, this.state );
        }
    }

    private wrapChild<T extends { props?: Record<string, any>}>( keyName: string, child: T ) : Object
    {
        if ( child.props && !child.props.optional ) this.requiredFields.add( keyName );
                            
        return { ...child, props: { ...child.props,
            onSuccess: ( value: string ) => this.onFieldChange( keyName, value ),
            onError  : (               ) => this.onFieldChange( keyName, null, false )
        } } as Object
    }

    private prepareChild<T>( child: React.ReactNode | React.ReactElement | React.JSXElementConstructor<T> | Object ) : Object
    {
        console.log( '1' );
        if ( child instanceof Object )
        {
            if ( 'props' in child )
            {
                if ( child.props instanceof Object )
                {
                    if ( 'children' in child.props )
                    {
                        child = { ...child, props: { ...child.props, children: this.prepareChildren( child.props.children ) } };
                    }
                    
                    const getType = ( child: any ) => {
                        try {
                            const _tp = child.type.prototype.constructor.InputClass( );

                            return _tp;
                        } catch( error: any ) { }
                    } 

                    if ( `${ getType( child ) }`.match( /Card(.*?)Input/ ) )
                    {
                        const _type = `${ getType( child ) }`;
                        
                        if ( _type.match( /CVV/ ) )
                        {
                            return this.wrapChild( 'cvv', child );
                        } else  if ( _type.match( /Expire/ ) ) {
                            return this.wrapChild( 'expire', child );
                        } else  if ( _type.match( /CardNumber/ ) ) {
                            return this.wrapChild( 'number', child );
                        } else {
                            return this.wrapChild( 'owner', child );
                        }  
                    }
                }
            }
        }

        return child as Object;
    }
    
    private prepareChildren( children: React.ReactNode | React.ReactNode[] ) : React.ReactNode
    {
        if ( children instanceof Array )
        {
            return children.map( child => this.prepareChild( child ) );
        } else {
            return this.prepareChild( children );
        }
    }

    render( ) : JSX.Element
    {
        let { theme='standard' } = this.props;
        let { children=[]   } = this.props;
        
        return ( 
            <div>
                <Card title={this.props.title} className={ ( this.props.className || '' ) + ` payment-card-${theme}`}>
                    <form onSubmit={ e => e.preventDefault( ) } name="payment-card-form" method="post">
                        {
                            this.prepareChildren( children )
                        } 
                    </form>
                </Card>
            </div>
        );
    } 
}