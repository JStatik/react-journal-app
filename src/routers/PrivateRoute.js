import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ( { isAuthenticated, component: JournalScreen, ...rest } ) => {
    return (
        <>  
            <Route { ...rest } component={ ( props ) => {
                return ( isAuthenticated ) ? <JournalScreen { ...props } /> : <Redirect to="/auth" />
            } } />
        </>
    )
};

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
};

export default PrivateRoute;
