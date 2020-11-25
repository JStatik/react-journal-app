import React from 'react';
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from '../../routers/AppRouter';
import { firebase } from '../../firebase/firebaseConfig';
import { login } from '../../actions/auth';

jest.mock( '../../actions/auth', () => (
    {
        login: jest.fn()
    }
) );

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const store = mockStore( {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 'ABC',
        },
        notes: []
    }
} );

store.dispatch = jest.fn();

describe( 'Pruebas en AppRouter', () => {
    test( 'Debe ejecutar la accion login(), si el usuario esta autenticado', async() => {
        let uid, displayName, photoURL;

        await act( async() => {
            const userCredentials = await firebase.auth().signInWithEmailAndPassword( 'test@testing.com', '123456' );
            uid = userCredentials.user.uid;
            displayName = userCredentials.user.displayName;
            photoURL = userCredentials.user.photoURL;

            mount(
                <Provider store={ store }>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        } );

        expect( login ).toHaveBeenCalledWith( uid, displayName, photoURL );
    } );
} );
