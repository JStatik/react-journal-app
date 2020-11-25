import { firebase, googleAuthProvider } from '../firebase/firebaseConfig'
import types from "../types/types";
import popUp from '../helpers/popups';
import { finishLoading, startLoading } from './ui';

export const startLoginWithEmailPassword = ( email, password ) => {
    return ( dispatch ) => {
        dispatch( startLoading() );

        return firebase.auth().signInWithEmailAndPassword( email, password ).then( ( { user } ) => {
            dispatch( login( user.uid, user.displayName, user.photoURL ) );
        } ).catch( ( { message } ) => {
            console.log( `Error: ${ message }` );
            popUp( 'error', '#990000', 'Error', 'Alguno de los datos ingresados no es correcto.' );
        } ).finally( () => {
            dispatch( finishLoading() );
        } );
    }
};

export const startGoogleLogin = () => {
    return ( dispatch ) => {
        dispatch( startLoading() );

        firebase.auth().signInWithPopup( googleAuthProvider ).then( ( { user } ) => {
            dispatch( login( user.uid, user.displayName, user.photoURL ) );
        } ).catch( ( { message } ) => {
            console.log( `Error: ${ message }` );
            popUp( 'error', '#990000', 'Error', 'Alguno de los datos ingresados no es correcto.' );
        } ).finally( () => {
            dispatch( finishLoading() );
        } );
    }
};

export const startRegisterWithNameEmailPassword = ( name, email, password ) => {
    return ( dispatch ) => {
        dispatch( startLoading() );

        firebase.auth().createUserWithEmailAndPassword( email, password ).then( async( { user } ) => {
            await user.updateProfile( { 
                displayName: name 
            } );

            dispatch( login( user.uid, user.displayName ) );
        } ).catch( ( { message } ) => {
            console.log( `Error: ${ message }` );
            popUp( 'error', '#990000', 'Error', 'El email ingresado ya está en uso.' );
        } ).finally( () => {
            dispatch( finishLoading() );
        } );
    }
};

export const login = ( uid, displayName, photoURL ) => (
    {
        type: types.login,
        payload: {
            uid: uid,
            displayName: displayName,
            photoURL: photoURL
        }
    }
);

export const startLogout = () => {
    return async( dispatch ) => {
        dispatch( startLoading() );
        await firebase.auth().signOut();

        dispatch( logout() );
        dispatch( finishLoading() );
    };
};

export const logout = () => (
    {
        type: types.logout
    }
);
