import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import JournalEntry from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

jest.mock( '../../../actions/notes', () => (
    {
        activeNote: jest.fn()
    }
) );

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const store = mockStore( {} );

store.dispatch = jest.fn();

describe( 'Pruebas en JournalEntry', () => {
    const note = {
        id: 'ABC',
        title: 'Titulo en test',
        body: 'Body en test',
        date: 0,
        url: 'https://photo.png'
    };

    const wrapper = mount(
        <Provider store={ store }>
            <JournalEntry { ...note } />
        </Provider>
    );

    test( 'Debe mostrar el componente correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    } );

    test( 'Debe ejecutar la accion activeNote()', () => {
        const { id, title, body, date, url } = note;

        wrapper.find( '.journal__entry' ).simulate( 'click' );

        expect( activeNote ).toHaveBeenCalledTimes( 1 );
        expect( activeNote ).toHaveBeenCalledWith( id, {
            title: title,
            body: body,
            date: date,
            url: url
        } );
    } );
} );
