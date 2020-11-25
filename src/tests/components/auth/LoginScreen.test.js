import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import LoginScreen from '../../../components/auth/LoginScreen';
import { startGoogleLogin, startLoginWithEmailPassword } from '../../../actions/auth';
import { removeError } from '../../../actions/ui';

jest.mock( '../../../actions/auth', () => (
    {
        startGoogleLogin: jest.fn(),
        startLoginWithEmailPassword: jest.fn()
    }
) );

jest.mock( '../../../actions/ui', () => (
    {
        removeError: jest.fn()
    }
) );

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const store = mockStore( {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
} );

store.dispatch = jest.fn();

describe( 'Pruebas en LoginScreen', () => {
    const wrapper = mount(
        <Provider store={ store }>
            <MemoryRouter>
                <LoginScreen />
            </MemoryRouter>
        </Provider>
    );

    beforeEach( () => {
        store.clearActions();
        jest.clearAllMocks();
    } );

    test( 'Debe mostrar el componente correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    } );

    test( 'Debe ejecutar la accion startGoogleLogin()', () => {
        wrapper.find( '.google-btn' ).simulate( 'click' );

        expect( startGoogleLogin ).toHaveBeenCalled();
    } );

    test( 'Debe ejecutar las acciones removeError() y startLoginWithEmailPassword()', () => {
        const input = wrapper.find( 'input' );
        
        input.at( 0 ).simulate( 'change', {
            target: {
                name: 'email',
                value: 'pepe@gmail.com'
            }
        } );

        input.at( 1 ).simulate( 'change', {
            target: {
                name: 'password',
                value: '123456'
            }
        } );

        wrapper.find( 'form' ).simulate( 'submit', {
            preventDefault(){}
        } );

        expect( removeError ).toHaveBeenCalled();
        expect( startLoginWithEmailPassword ).toHaveBeenCalledWith( 'pepe@gmail.com', '123456' );
    } );
} );
