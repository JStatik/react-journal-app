import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import useForm from '../../hooks/useForm';
import NotesAppBar from './NotesAppBar';

const NoteScreen = () => {
    const dispatch = useDispatch();
    const { active: note } = useSelector( store => store.notes );
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { id, title, body } = formValues;
    const activeId = useRef( id );
    const activeUrl = useRef( note.url );

    useEffect( () => {
        if( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id;
        }

        if( note.url !== activeUrl.current ) {
            reset( note );
            activeUrl.current = note.url;
        }
    }, [ note, reset ] );

    useEffect( () => {
        dispatch( activeNote( formValues.id, { ...formValues } ) );
    }, [ formValues, dispatch ] );

    const handleDelete = () => {
        dispatch( startDeleting( id ) );
    };

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input type="text" name="title" placeholder="Algún buen título" className="notes__title-input" autoComplete="off" value={ title } onChange={ handleInputChange } />
                <textarea name="body" placeholder="¿Que sucedio hoy?" className="notes__textarea" autoComplete="off" value={ body } onChange={ handleInputChange }></textarea>
                {
                    note.url && 
                    <div className="notes__image">
                        <img src={ `${ note.url }` } alt={ `${ note.title }` }/>
                    </div>
                }
            </div>

            <button className="btn btn-danger" onClick={ handleDelete }>Borrar</button>
        </div>
    )
};

export default NoteScreen;
