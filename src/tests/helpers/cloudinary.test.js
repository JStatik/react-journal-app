import '@testing-library/jest-dom';
import cloudinary from 'cloudinary';
import sendImageCloudinary from '../../helpers/cloudinary';

cloudinary.config( { 
    cloud_name: 'CLOUD_NAME', 
    api_key: 'API_KEY', 
    api_secret: 'API_SECRET' 
} );

describe( 'Pruebas en cloudinary', () => {
    test( 'Debe subir una imagen a Cloudinary y retornar un URL', async() => {
        const peticionImg = await fetch( 'https://1.bp.blogspot.com/-79DdxzZkDog/T76QV6v5IuI/AAAAAAAAAEY/6DzpGZzsmfA/s320/homerocatolico_456_336.jpg' );
        const img = await peticionImg.blob();

        const file = new File( [ img ], 'foto.jpg' );

        const peticionUrl = await sendImageCloudinary( file );

        expect( typeof peticionUrl ).toBe( 'string' );
        expect( peticionUrl.includes( 'https://' ) ).toBe( true );

        const segments = peticionUrl.split( '/' );
        const public_id = segments[ segments.length - 1 ].replace( '.jpg', '' );
        await cloudinary.v2.api.delete_resources( public_id, {}, () => {} );
    } );

    test( 'No debe subir una imagen a Cloudinary y retornar un error', async() => {
        const file = new File( [], 'foto.jpg' );

        const peticionUrl = await sendImageCloudinary( file );
        const { message } = peticionUrl.error;

        expect( message ).toBe( 'Empty file' );
    } );
} );
