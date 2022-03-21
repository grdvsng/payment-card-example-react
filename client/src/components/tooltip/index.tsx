import React, { CSSProperties }                from 'react';
import BasicComponent, { BasicComponentProps } from '../basic';
import AlertIcon                               from '../../assets/svg/alert.svg';
import { FiAlertCircle }                       from 'react-icons/fi';
import ReactDOM                                from 'react-dom';
import { Tag }                                 from 'antd';



type position = 'left' | 'right' | 'top' | 'bottom';

export interface ToolTipProps<T extends HTMLElement> extends BasicComponentProps
{
    type     ?: 'error' | 'info' | 'warn';
    master    : T;
    position ?: position;
    message  ?: string;
    visible  ?: boolean;
    right    ?: string;
    left     ?: string;
    top      ?: string;
    bottom   ?: string;
}


export default class ToolTipStandard<T extends HTMLElement> extends BasicComponent
{ 
    state: {
        element?: HTMLElement;
    } = { };

    constructor( readonly props: ToolTipProps<T> )
    {
        super( props );
    }

    async renderer( )
    {
        const {
            type='info',
            master,
            position='left',
            message='',
            visible,
            right  ,
            left   ,
            top    ,
            bottom ,
        } = this.props;
        
        const body = document.body;

        if ( body && !this.state.element )
        {
            const rect = master.getBoundingClientRect( );

            const element = document.createElement( 'div' );
         
            element.className = 'payment-card-tooltip payment-card-tooltip-' + type;

            ReactDOM.render( 
                <Tag className="payment-card-tooltip-tag">
                    <FiAlertCircle className={ 'payment-card-tooltip-' + type + '-icon'}/>
                    { ' ' + message }
                </Tag>, element
            );
            
            body.appendChild( element );

            await this.setState( { element } );

            element.style.position = 'absolute';
            element.style.zIndex   = '100000';
            //element.style.minWidth = Number( message.length * 12 ) + 'px';
            //element.style.height   = Number( rect.height         ) + 'px';           

            if ( position == 'top' )
            {
                element.style.left   = Number( rect.left  ) + 'px';
                element.style.right  = Number( rect.right ) + 'px';
                element.style.bottom = Number( rect.top - window.scrollY ) + 'px';
            } else if ( position == 'bottom' ) {
                element.style.left     = Number( rect.left  ) + 'px';
                element.style.right    = Number( rect.right ) + 'px';
                element.style.top    = Number( rect.bottom + window.scrollY ) + 'px';
            } else if ( position == 'right' ) {
                element.style.top  = Number( rect.top   + window.scrollY ) + 'px';
                element.style.left = Number( rect.right + window.scrollX ) + 'px';
            } else {
                element.style.top   = Number( rect.top  + window.scrollY ) + 'px';
                element.style.right = Number( rect.left - window.scrollX ) + 'px';
            }
        }

        if ( this.state.element )
        {
            if ( right  ) this.state.element.style.right  = right;
            if ( left   ) this.state.element.style.left   = left;
            if ( top    ) this.state.element.style.top    = top;
            if ( bottom ) this.state.element.style.bottom = bottom;

            this.state.element.style.display = visible ? 'flex':'none';
        }
    }
    
    componentWillUpdate( )
    {
        this.renderer( );
    }

    componentWillMount( )
    {
        this.renderer( );
    }

    componentWillUnmount( )
    {
        const { element } = this.state;

        if ( element )
        {
            element.remove( );

            this.setState( { element: undefined } );
        }
    }

    render( ) : JSX.Element
    {
        return <></>;
    }
}