import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import { startSaveNote, startUploading } from '../../actions/notes';
import popUp from '../../helpers/popups';

const NotesAppBar = () => {
    const date = moment( new Date() );
    const dispatch = useDispatch();
    const { active: note } = useSelector( store => store.notes );

    const handleSave = () => {
        dispatch( startSaveNote( note ) );
    };

    const handlePicture = () => {
        document.getElementById( 'fileSelector' ).click();
    };

    const handleFile = ( event ) => {
        const file = event.target.files[ 0 ];
        const nameFile = file?.name;

        if( nameFile ) {
            if( nameFile.includes( '.jpg' ) || nameFile.includes( '.jpeg' ) || nameFile.includes( '.png' ) || nameFile.includes( '.svg' ) ) {
                dispatch( startUploading( file ) );
                document.getElementById( 'fileSelector' ).value = '';
            } else {
                popUp( 'error', '#990000', 'Error', 'El archivo seleccionado no es correcto. Elija una imagen.' );
                document.getElementById( 'fileSelector' ).value = '';
            }
        }
    };

    return (
        <div className="notes__app-bar">
            <span><span className="capitalize">{ date.format( 'dddd' ) }, </span>{ `${ date.format( 'DD' ) } de ${ date.format( 'MMMM' ) } del ${ date.format( 'YYYY' ) }` }</span>

            <input type="file" name="file" id="fileSelector" style={ { display: 'none' } } onChange={ handleFile }/>

            <div>
                <button className="btn" onClick={ handlePicture }>Imagen</button>
                <button className="btn" onClick={ handleSave }>Guardar</button>
            </div>
        </div>
    )
};

export default NotesAppBar;
