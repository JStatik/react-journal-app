import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import cloudinary from 'cloudinary';
import { bd } from '../../firebase/firebaseConfig';
import types from '../../types/types';
import { startNewNote, startSaveNote, startUploading } from '../../actions/notes';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const store = mockStore( {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: '4ZdpV52ambocyF7UbE37',
            body: 'Hola mundo',
            title: 'Titulo'
        }
    }
} );

cloudinary.config( { 
    cloud_name: 'jstatik', 
    api_key: '784667188435915', 
    api_secret: 'WNmb0UUYJzurcSl4Y2NOuxd1tps' 
} );

describe( 'Pruebas en notes', () => {
    beforeEach( () => {
        store.clearActions();
    } );

    test( 'Debe crear una nueva nota, almacenarla en Firestore y a su vez eliminarla', async() => {
        await store.dispatch( startNewNote() );
        const actions = store.getActions();

        expect( actions[ 0 ] ).toEqual( {
            type: types.notesActive,
            payload: {
                title: '',
                body: '',
                date: expect.any( Number ),
                id: expect.any( String )
            }
        } );

        expect( actions[ 1 ] ).toEqual( {
            type: types.notesAddNew,
            payload: {
                title: '',
                body: '',
                date: expect.any( Number ),
                id: expect.any( String )
            }
        } );

        const { uid } = store.getState().auth;
        const [ action ] = actions;
        const { id } = action.payload;

        await bd.doc( `${ uid }/journal/notes/${ id }` ).delete();
    } );

    test( 'Debe actualizar la nota', async() => {
        const note = {
            id: '7qlWjfBdyhM0eAiUgSa4',
            body: 'Creado desde el test',
            title: 'Titulo desde test',
        }

        await store.dispatch( startSaveNote( note ) );
        const actions = store.getActions();
        
        expect( actions[ 0 ].type ).toBe( types.notesUpdate );
    } );

    test( 'Debe actualizar el URL de la nota activa', async() => {
        const peticionImg = await fetch( 'https://1.bp.blogspot.com/-79DdxzZkDog/T76QV6v5IuI/AAAAAAAAAEY/6DzpGZzsmfA/s320/homerocatolico_456_336.jpg' );
        const img = await peticionImg.blob();

        const file = new File( [ img ], 'foto.jpg' );

        await store.dispatch( startUploading( file ) );

        const { url } = store.getState().notes.active;
        const segments = url.split( '/' );
        const public_id = segments[ segments.length - 1 ].replace( '.jpg', '' );

        await cloudinary.v2.api.delete_resources( public_id, {}, () => {} );

        expect( url ).toEqual( expect.any( String ) );
    } );
} );
