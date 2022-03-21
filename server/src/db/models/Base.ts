import { DataTypes, InitOptions, Model, ModelAttributes } from 'sequelize'
import sequelize                                          from '../config';

export interface BasicAttributes
{
    id      : number;
    created?: Date;
    updated?: Date;
}

export const BasicOptions = {
    sequelize,
    
    timestamps : true,
    created    : false,
    updated    : 'updateTimestamp',
};

export const BasicAttributes = {
    id: {
        type         : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey   : true 
    } 
}


export class BaseModel<T,V> extends Model<T, V> implements BasicAttributes 
{
    public id!: number;
    
    public readonly card_id!: number;

    public readonly created!: Date;
    public readonly updated!: Date;

    static configure<T extends Model<any, any>,V extends Object>( attributes: ModelAttributes<T, V>, options?: V )
    {
        this.init( { ...BasicAttributes, ...attributes }, { ...BasicOptions, ...( options || { } ) } )
    }
}