import Swal from 'sweetalert2';
import { bd } from '../firebase/firebaseConfig';
import types from '../types/types';
import popUp from '../helpers/popups';
import sendImageCloudinary from '../helpers/cloudinary';

export const startNewNote = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        try {
            const docRef = bd.collection( `${ uid }/journal/notes` );
            const noteRef = await docRef.add( newNote );
        
            dispatch( activeNote( noteRef.id, newNote ) );
            dispatch( addNewNote( noteRef.id, newNote ) );
        } catch( error ) {
            console.log( error );
        }      
    };
};

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        const notes = [];
        const { uid } = getState().auth;

        try {
            const notesSnap = await bd.collection( `${ uid }/journal/notes` ).get();

            notesSnap.forEach( note => {
                notes.push( {
                    ...note.data(),
                    id: note.id                
                } );
            } );

            dispatch( setNotes( notes ) );
        } catch( error ) {
            console.log( error );
        }       
    };
};

export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;

        !note.url && delete note.url;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        try {
            await bd.doc( `${ uid }/journal/notes/${ note.id }` ).update( noteToFirestore );

            dispatch( refreshNote( note ) );
            popUp( 'success', '#005928 ', 'Éxito', 'Los cambios se han efectuado correctamente.' );
        } catch( error ) {
            console.log( error );
        }
    };
};

export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {
        const { active: note } = getState().notes;

        Swal.fire( { 
            hideClass: {
                popup: 'animate__animated animate__zoomOut'
            },
            willOpen: () => {
                Swal.showLoading();
            },
            showClass: {
                popup: 'animate__animated animate__zoomIn'
            },
            title: '<h6>Subiendo imagen</h6>',
            text: 'Por favor, espere...',
            width: '27rem'
        } );

        const urlImage = await sendImageCloudinary( file );
        note.url = urlImage;

        dispatch( startSaveNote( note ) );

        Swal.close();
    };
};

export const startDeleting = ( id ) => {
    return ( dispatch, getState ) => {
        const { uid } = getState().auth;

        bd.doc( `${ uid }/journal/notes/${ id }` ).delete().then( () => {
            dispatch( deleteNote( id ) );
        } ).catch( error => {
            console.log( error );
        } );

        Swal.close();
    };
};

export const activeNote = ( id, note ) => (
    {
        type: types.notesActive,
        payload: {
            ...note,
            id: id
        }
    }
);

export const addNewNote = ( id, note ) => (
    {
        type: types.notesAddNew,
        payload: {
            ...note,
            id: id
        }
    }
);

export const setNotes = ( notes ) => (
    {
        type: types.notesLoad,
        payload: notes
    }
);

export const refreshNote = ( note ) => (
    {
        type: types.notesUpdate,
        payload: note
    }
);

export const deleteNote = ( id ) => (
    {
        type: types.notesDelete,
        payload: id
    }
);

export const noteLogout = () => (
    {
        type: types.notesLogoutCleaning,
        payload: {
            notes: [],
            active: null
        }
    }
);
