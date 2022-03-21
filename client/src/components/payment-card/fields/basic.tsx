import React                                   from 'react';
import BasicComponent, { BasicComponentProps } from '../../basic';
import { Input, InputRef, Tooltip  }           from 'antd';
import { AiOutlineEye, AiFillEyeInvisible }    from 'react-icons/ai';
import PaymentCard                             from '../card';
import ReactTooltip                            from 'react-tooltip';
import ToolTipStandard from '../../tooltip';



export interface ValidatorResult
{
    success  : boolean;
    message ?:  string;
}


export interface PaymentCardInputProps<T> extends BasicComponentProps
{
    validator       ?: ( value: T ) => ValidatorResult;
    placeholder     ?: string;
    hidden          ?: boolean;
    optional        ?: boolean;
    onSuccess       ?: ( value: T ) => void;
    onError         ?: ( value: unknown ) => void;
    valueConverter  ?: ( value: T ) => T;
    errorRenderer   ?: ( value: string, element: HTMLElement | undefined ) => unknown;
    master          ?: PaymentCard,
    name            ?: string;
}


export default class PaymentCardInput<T extends string | number | readonly string[] | undefined > extends BasicComponent
{   
    protected className   : string = 'payment-card-input';
    protected placeholder : string = '';
    
    protected ref            : HTMLElement | undefined;
    protected container      : HTMLElement | undefined;
    protected errorTooltipRef: HTMLParagraphElement | undefined;

    defaultValidator( value: T ) : ValidatorResult
    {
        console.warn( `Can't validate '${value}' dafault validator using` );

        return { success: true } as ValidatorResult;
    }

    defaultValueConverter( value: T ) : T
    {
        return value;
    }
    
    public state: {
        success             ?: boolean;
        validationError     ?: string | null;
        value               ?: T | undefined;
        hidden              ?: boolean;
        errorToolTipVisible ?: boolean;
    } = { };

    constructor( readonly props: PaymentCardInputProps<T> )
    {
        super( props );

        const { hidden } = this.props;

        this.state.hidden = hidden;
    }

    async onChange( eventTarget: HTMLInputElement, value: T )
    {
        const { validator     =( v ) => this.defaultValidator     ( v ) } = this.props;
        const { valueConverter=( v ) => this.defaultValueConverter( v ) } = this.props; 
        //const cursorPosition  = eventTarget.selectionStart;
        
        value = valueConverter( value );

        const result = validator( value );

        if ( result.success )
        {
            if ( this.props.onSuccess )
            {
                this.props.onSuccess( value );
            } 
            
            this.setState( { value, validationError: null, success: true } );
        } else {
            if ( this.props.onError ) this.props.onError( result.message );

            await this.setState( { value, success: false, validationError: result.message } );
        }
    }

    protected renderViewControl( ) : JSX.Element
    {
        const hiddenControlProps = {
            onClick: ( ) => this.setState( { hidden: !this.state.hidden } ),
        };

        return this.state.hidden ? 
            <AiOutlineEye       { ...hiddenControlProps }/>:
            <AiFillEyeInvisible { ...hiddenControlProps }/>;
    }

    protected renderError( message: string ) : unknown
    {
        const ref = this.ref;
        
        if ( ref )
        {
            if ( this.props.errorRenderer )
            {
                return this.props.errorRenderer( message, ref );
            } else {
                //@ts-ignore
                const container = this.container;
                
                let left: number|undefined = undefined;

                try {
                    //@ts-ignore
                    const parent: HTMLElement = container.parentNode.parentNode;
                    
                    left = parent.getBoundingClientRect( ).right + window.scrollX;
                } catch ( error: unknown ) { }
                
                return <ToolTipStandard 
                    type    ='error'
                    master  ={ ref }
                    message ={ message }
                    visible ={ this.state.errorToolTipVisible }
                    position='left'
                    left   ={ left ? left + 'px':undefined }
                />     
            }  
        }
    }

    render( ) : JSX.Element
    {
        const { hidden }    = this.state;
        const hiddenSupport = 'hidden' in this.props;
        const isError       = !this.state.success && !!this.state.validationError;

        return ( 
            <div 
                key={this.props.key + '-container' }
                ref={ ref => this.container = ref || undefined }
            >
                <span 
                    style={{ alignItems: 'baseline', flexDirection: 'row', display: 'inline-flex' }}>
                        { isError && this.renderError( `${this.state.validationError}` ) }
                        <Input 
                            name       ={ this.props.name }
                            key        ={ this.props.key + '-input' }
                            className  ={ ( this.props.className || '' ) + this.className + (
                                isError ? 
                                    ' validation-error' : ( 
                                        this.state.success && `${this.state.value}`.length > 0 ? ' validation-success':'' 
                                    ) 
                            ) }
                            placeholder ={ this.props.placeholder || this.placeholder }
                            onChange    ={ ev => this.onChange( ev.target, ev.target.value as unknown as T ) }
                            value       ={ this.state.value }
                            type        ={ hidden ? 'password' : 'text' }
                            ref         ={ ref => { if ( ref ) this.ref = ref.input || undefined } }
                            onMouseOver ={ ( ) => this.setState( { errorToolTipVisible: false } ) }
                            onMouseOut  ={ ( ) => this.setState( { errorToolTipVisible: true  } ) }
                            onBlur      ={ ( ) => this.setState( { errorToolTipVisible: false } ) }
                            onFocus     ={ ( ) => this.setState( { errorToolTipVisible: true  } ) }
                        > 
                        
                        </Input>
                        { hiddenSupport && ( `${ this.state.value || '' }` ).length > 0 && this.renderViewControl( ) }
                </span>
            </div>
        );
    }
}