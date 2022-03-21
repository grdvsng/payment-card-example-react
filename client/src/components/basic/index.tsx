import React from 'react';

import 'antd/dist/antd.css';


export interface BasicComponentProps
{
    children ?: React.ReactNode | React.ReactNode[];
    className?: string;
    key      ?: string | number
}


export default class BasicComponent extends React.Component
{
    constructor( readonly props: BasicComponentProps )
    {
        super( props );
    }
}