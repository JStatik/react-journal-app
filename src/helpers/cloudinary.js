const sendImageCloudinary = async( file ) => {
    const url = 'URL_CLOUDINARY';

    const formData = new FormData();
    formData.append( 'file', file );
    formData.append( 'upload_preset', 'react-journal-app' );

    try {
        const peticion = await fetch( url, {
            method: 'POST',
            body: formData
        } );
        
        if( peticion.ok ) {
            const respuesta = await peticion.json();
            const urlImage = respuesta.secure_url;

            return urlImage;
        } else {
            const respuesta = await peticion.json();

            return respuesta;
        }
    } catch( error ) {
        return console.log( error );;
    }
};

export default sendImageCloudinary;
