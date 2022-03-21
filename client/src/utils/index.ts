
export function randint( min: number=10, max?: number ) : number
{
    if ( !max )
    {
        max = min;
        min = 0;
    }

    if ( max > min )
    {
        const tmp = max;

        max = min;
        min = tmp;
    }

    return Math.round( Math.random( ) * ( max - min ) + min );
}

export function choice<T>( list: T[] ) : T
{
    if ( list.length === 0 ) throw new Error( 'Cant choice in empty list' );
    
    const index = randint( 0, list.length );

    console.log( index );

    return list[ index ];
}

export async function connectSVG( path: string ) : Promise<HTMLElement>
{
    const response = await fetch( path );

    if ( response.status == 200 )
    {
        const text   = await response.text( );
        const parser = new DOMParser( );

        return parser.parseFromString( text, "image/svg+xml" ).documentElement as unknown as HTMLElement;
    } else {
        throw new Error( `Invalide status code ${response.status}` );
    }
}