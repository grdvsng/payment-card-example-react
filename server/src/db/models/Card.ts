import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize'
import { BaseModel, BasicAttributes }                  from './Base';
import Donate from './Donate';


export interface CardAttributes extends BasicAttributes
{
  number: string;
  cvv   : string;
  expire: Date;
  owner : string;
}


export interface CardInput extends Optional<CardAttributes, 'id'|'number'> {}
export interface CardOuput extends Required<CardAttributes      > {}


class Card extends BaseModel<CardAttributes, CardInput> implements CardAttributes 
{
  public number!: string;
  public cvv   !: string;
  public expire!: Date;
  public owner !: string;

  toJSON () {
    var values = Object.assign( { }, this.get( ) );
  
    values['cvv'] = '*'.repeat( values['cvv'].length )
    
    return values;
  }
}

Card.configure( {
  number: { type: DataTypes.STRING( 16  ), allowNull: false, unique: true },
  cvv   : { type: DataTypes.STRING( 3   ), allowNull: false, },
  expire: { type: DataTypes.DATEONLY     , allowNull: false, },
  owner : { type: DataTypes.STRING( 255 ), allowNull: false, },
} );  


export default Card;