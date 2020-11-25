import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import types from '../../types/types';
import { login, logout, startLoginWithEmailPassword, startLogout } from '../../actions/auth';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const store = mockStore( {} );

describe( 'Pruebas en auth', () => {
    beforeEach( () => {
        store.clearActions();
    } );

    test( 'Debe de funcionar correctamente login y logout', () => {
        const uid = '123456';
        const displayName = 'Javier Carreño';
        const photoUrl = 'https://photoUrl.png';

        const loginAction = login( uid, displayName, photoUrl );
        const logoutAction = logout();

        expect( loginAction ).toEqual( {
            type: types.login,
            payload: {
                uid: uid,
                displayName: displayName,
                photoURL: photoUrl
            }
        } );

        expect( logoutAction ).toEqual( {
            type: types.logout
        } );
    } );

    test( 'Debe realizar el logout', async() => {
        await store.dispatch( startLogout() );
        const actions = store.getActions();

        expect( actions[ 0 ] ).toEqual( {
            type: types.uiStartLoading,
            payload: expect.any( Boolean )
        } );

        expect( actions[ 1 ] ).toEqual( {
            type: types.logout
        } );

        expect( actions[ 2 ] ).toEqual( {
            type: types.uiFinishLoading
        } );
    } );

    test( 'Debe realizar el login con el email y password', async() => {
        await store.dispatch( startLoginWithEmailPassword( 'test@testing.com', '123456' ) );
        const actions = store.getActions();

        expect( actions[ 0 ] ).toEqual( {
            type: types.uiStartLoading,
            payload: expect.any( Boolean )
        } );

        expect( actions[ 1 ] ).toEqual( {
            type: types.login,
            payload: {
                uid: expect.any( String ),
                displayName: null,
                photoURL: null
            }
        } );

        expect( actions[ 2 ] ).toEqual( {
            type: types.uiFinishLoading
        } );
    } );
} );
