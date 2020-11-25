import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Sidebar from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/auth';
import { noteLogout, startNewNote } from '../../../actions/notes';

jest.mock( '../../../actions/auth', () => (
    {
        startLogout: jest.fn()
    }
) );

jest.mock( '../../../actions/notes', () => (
    {
        noteLogout: jest.fn(),
        startNewNote: jest.fn()
    }
) );

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const store = mockStore( {
    auth: {
        uid: '123456',
        name: 'Pepe Ruiz'
    },
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

describe( 'Pruebas en Sidebar', () => {
    const wrapper = mount(
        <Provider store={ store }>
            <Sidebar />
        </Provider>
    );

    test( 'Debe mostrar el componente correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    } );

    test( 'Debe ejecutar la accion startLogout() y noteLogout()', () => {
        wrapper.find( 'button' ).simulate( 'click' );

        expect( startLogout ).toHaveBeenCalledTimes( 1 );
        expect( noteLogout ).toHaveBeenCalledTimes( 1 );
    } );

    test( 'Debe ejecutar la accion startNewNote()', () => {
        wrapper.find( '.journal__new-entry' ).simulate( 'click' );

        expect( startNewNote ).toHaveBeenCalledTimes( 1 );
    } );
} );
