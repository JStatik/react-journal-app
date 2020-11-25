import '@testing-library/jest-dom';
import types from '../../types/types';

describe( 'Pruebas en types', () => {
    test( 'Debe ser un objeto y del mismo valor', () => {
        expect( typeof types ).toEqual( 'object' );
        expect( types ).toEqual( {
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
            uiStartLoading: '[UI] Start Loading',
            uiFinishLoading: '[UI] Finish Loading',
        
            notesNewEntry: '[Notes] New Note',
            notesActive: '[Notes] Set Active Note',
            notesAddNew: '[Notes] Add New Note',
            notesLoad: '[Notes] Load Notes',
            notesUpdate: '[Notes] Update Note',
            notesFileImg: '[Notes] Update Note Img',
            notesDelete: '[Notes] Delete Note',
            notesLogoutCleaning: '[Notes] Logout Cleaning'
        } );
    } );
} );
