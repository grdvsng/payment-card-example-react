import React                 from 'react';
import CardApi               from '../../api/card';
import { Table, Tag, Space } from 'antd';

import './style.scss';


export interface Donate 
{
    id      : number;
    donater : string;
    amout   : string;
    curency : string;
    key     : string;
};

export default class DonatersPage extends React.Component
{
    state: {
        donates?: Donate[]
    } = { };

    async componentDidMount( )
    {
        try {
            const cards             = ( await CardApi.getAll( ) );
            const donates: Donate[] = [ ];
            
            for ( let i=0; i < cards.length; i++ )
            {
                const card = cards[i];
                const _donates = card.Donates || [ ];

                [ ..._donates ].map( ( donate, key ) =>  donates.push( {
                    id       : Number( donate.id ),
                    donater  : card.owner || 'anon',
                    amout    : donate.amount + '',
                    curency  : donate.curency,
                    key      : key + ''
                } as Donate ) );
            } 
            
            this.setState( { donates } );
        } catch ( error: unknown ) {
            console.error( error );

            this.setState( { donates: [ ] } );
        }
    }

    private renderTable( data: Donate[] ) 
    {
        const columns = [ 
            { title: 'ID'     , dataIndex: 'id'     , key: 'id'      },
            { title: 'Donater', dataIndex: 'donater', key: 'donater' },
            { title: 'Amout'  , dataIndex: 'amout'  , key: 'amout'   },
            { title: 'Curency', dataIndex: 'curency', key: 'curency' },
        ];
        
        return <Table columns={columns} dataSource={data} className="donate-table"/>;
    }

    render() 
    {
        return ( 
            <div className="payment-card-container">
                { this.state.donates && this.renderTable( this.state.donates ) }
            </div> 
        );
    }
}