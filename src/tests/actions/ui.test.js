import '@testing-library/jest-dom';
import types from '../../types/types';
import { finishLoading, removeError, setError, startLoading } from '../../actions/ui';

describe( 'Pruebas en ui', () => {
    test( 'Todas las acciones, deben funcionar correctamente', () => {
        const setErrorAction = setError( 'ERROR' );
        const removeErrorAction = removeError();
        const startLoadingAction = startLoading();
        const finishLoadingAction = finishLoading();

        expect( setErrorAction ).toEqual( {
            type: types.uiSetError,
            payload: 'ERROR'
        } );

        expect( removeErrorAction ).toEqual( {
            type: types.uiRemoveError
        } );

        expect( startLoadingAction ).toEqual( {
            type: types.uiStartLoading,
            payload: true
        } );

        expect( finishLoadingAction ).toEqual( {
            type: types.uiFinishLoading
        } );
    } );
} );
