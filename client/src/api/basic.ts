export default class BasicApi
{
    constructor (
        readonly basicurl: string
    ) {

    }

    private buildRequestParams<T>( method: string, data?: T ) : RequestInit
    {
        return {
            method: method.toUpperCase( ),
            credentials: 'include',
            headers: {
                'Cache-Control': 'no-cache',
                'Accept'       : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: data ? JSON.stringify( data ):undefined,
        }
    }

    async getTesponse<T>( reponse: Promise<Response> ) : Promise<T>
    {
        try {
            const resp = await reponse;
            
            if ( resp.status === 200 || resp.status === 204 )
            {
                const data = await resp.json( );

                return data;
            } else {
                const data = await resp.json( );

                throw new Error( `${data.error || 'unnknown' }` );
            }
        } catch ( error ) {
            const errstr = `${error}`.replace( /^error\:/gi, '' );

            throw new Error( `\r\r:Api::${errstr}` );
        }
    }

    async get<T>( url: string ) : Promise<T>
    {
        const response = fetch( this.basicurl + '/' + url, this.buildRequestParams( 'get' ) );

        return await this.getTesponse( response );
    }

    async post<T, V>( url: string, data: V ) : Promise<T>
    {
        const response = fetch( this.basicurl + '/' + url, this.buildRequestParams( 'post', data ) );

        return await this.getTesponse( response );
    }
}