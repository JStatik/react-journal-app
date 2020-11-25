import '@testing-library/jest-dom';
import types from '../../types/types';
import authReducer from '../../reducers/authReducer';

describe( 'Pruebas en authReducer', () => {
    const initialState = {};
    const newState = {      
        uid: '123456',
        displayName: 'Javier Carreño',
        photoURL: 'https://photo.png'
    };

    test( 'Debe retornar el state por defecto', () => {
        const state = authReducer( initialState, {} );

        expect( state ).toEqual( {} );
    } );

    test( 'Debe retornar el state con el uid, name y photoUrl al hacer login', () => {
        const action = {
            type: types.login,
            payload: newState
        };

        const state = authReducer( initialState, action );
        const { uid, name, photoURL } = state;

        expect( uid ).toBe( '123456' );
        expect( name ).toBe( 'Javier Carreño' );
        expect( photoURL ).toBe( 'https://photo.png' );
    } );

    test( 'Debe retornar el state por defecto al hacer logout', () => {
        const action = {
            type: types.logout
        };

        const state = authReducer( newState, action );
        
        expect( state ).toEqual( initialState );
    } );
} );
