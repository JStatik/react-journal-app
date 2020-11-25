import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { firebase } from '../firebase/firebaseConfig';
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';
import LoadingScreen from '../components/loading/LoadingScreen';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import AuthRouter from './AuthRouter';
import JournalScreen from '../components/journal/JournalScreen';

const AppRouter = () => {
    const dispatch = useDispatch();
    const { loading: uiLoading } = useSelector( store => store.ui );

    const [ loading, setLoading ] = useState( true );
    const [ isLoggedIn, setIsLoggedIn ] = useState( false );

    useEffect( () => {
        firebase.auth().onAuthStateChanged( user => {
            if( user?.uid ) {
                dispatch( login( user.uid, user.displayName, user.photoURL ) );
                setIsLoggedIn( true );

                dispatch( startLoadingNotes() );        
            } else {
                setIsLoggedIn( false );
            }

            setLoading( false );
        } );
    }, [ dispatch, setLoading, setIsLoggedIn ] );

    if( loading || uiLoading ) {
        return ( <LoadingScreen /> );
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path="/auth" isAuthenticated={ isLoggedIn } component={ AuthRouter } />
                    <PrivateRoute exact path="/" isAuthenticated={ isLoggedIn } component={ JournalScreen } />
                    
                    <Redirect to="/auth" />
                </Switch>
            </div>
        </Router>
    )
};

export default AppRouter;
