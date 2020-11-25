import types from "../types/types";

const authReducer = ( state = {}, action ) => {
    switch( action.type ) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
                photoURL: action.payload.photoURL
            };

        case types.logout:
            return {};

        default:
            return state;
    }
};

export default authReducer;
