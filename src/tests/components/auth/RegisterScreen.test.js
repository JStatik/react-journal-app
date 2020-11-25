import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import RegisterScreen from '../../../components/auth/RegisterScreen';
import types from '../../../types/types';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const store = mockStore( {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
} );

describe( 'Pruebas en RegisterScreen', () => {
    const wrapper = mount(
        <Provider store={ store }>
            <MemoryRouter>
                <RegisterScreen />
            </MemoryRouter>
        </Provider>
    );

    beforeEach( () => {
        store.clearActions();
    } );

    test( 'Debe mostrar el componente correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    } );

    test( 'Debe ejecutar la accion setError() con el mensaje de nombre invalido', () => {
        wrapper.find( 'form' ).simulate( 'submit', {
            preventDefault(){}
        } );

        const actions = store.getActions();

        expect( actions[ 0 ] ).toEqual( {
            type: types.uiSetError,
            payload: 'Ingrese un nombre válido'
        } );
    } );

    test( 'Debe mostrar el mensaje de error con el texto correspondiente', () => {
        const store = mockStore( {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Ingrese un nombre válido'
            }
        } );

        const wrapper = mount(
            <Provider store={ store }>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );

        expect( wrapper.find( '.auth__alert-error' ).exists() ).toBe( true );
        expect( wrapper.find( '.auth__alert-error' ).text() ).toBe( store.getState().ui.msgError );
    } );
} );
