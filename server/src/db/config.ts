import * as path     from 'path';
import { Sequelize } from 'sequelize';


export default new Sequelize( {
  dialect: 'sqlite',
  storage: path.join( path.dirname( __dirname ), 'storage.db')
} );