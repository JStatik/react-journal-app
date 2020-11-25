import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import NoteScreen from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';

jest.mock( '../../../actions/notes', () => (
    {
        activeNote: jest.fn()
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
            title: 'Titulo de test',
            body: 'Body de test',
            date: 0
        },
        notes: []
    }
} );

store.dispatch = jest.fn();

describe( 'Pruebas en NoteScreen', () => {
    const wrapper = mount(
        <Provider store={ store }>
            <NoteScreen />
        </Provider>
    );

    test( 'Debe mostrar el componente correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    } );

    test( 'Debe ejecutar la accion activeNote()', () => {
        const { id, title, date } = store.getState().notes.active;

        wrapper.find( 'textarea' ).simulate( 'change', {
            target: {
                name: 'body',
                value: 'Body de test modificado'
            }
        } );

        expect( activeNote ).toHaveBeenCalledTimes( 1 );
        expect( activeNote ).toHaveBeenCalledWith( id, {
            id: id,
            title: title,
            body: 'Body de test modificado',
            date: date
        } );
    } );
} );
