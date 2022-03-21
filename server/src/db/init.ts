import { Card, Donate } from './models'


const isDev  = process.env.NODE_ENV === 'development'
const models = [ Card, Donate ];


export default function dbInit( )
{
  models.forEach( model => model.sync( { alter: isDev } ) )
}