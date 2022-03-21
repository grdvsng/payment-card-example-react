import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize'
import { BaseModel, BasicAttributes }                  from './Base';
import Card                                            from './Card';


export interface DonateAttributes extends BasicAttributes
{
  amount  : number;
  curency : string;
  card_id : number;
}


export interface DonateInput extends Optional<DonateAttributes, 'id' | 'card_id'> {}
export interface DonateOuput extends Required<DonateAttributes                  > {}


class Donate extends BaseModel<DonateAttributes, DonateInput> implements DonateAttributes 
{
  public amount  !: number;
  public curency !: string;
  public card_id !: number;
}


Donate.configure( {
  amount  : { type: DataTypes.INTEGER      , allowNull: false },
  curency : { type: DataTypes.STRING( 255 ), allowNull: false },
} ); 

Donate.belongsTo( Card  , { as: 'payment', foreignKey: 'card_id' } );
Card.hasMany    ( Donate, { foreignKey: 'card_id'                } );

export default Donate;