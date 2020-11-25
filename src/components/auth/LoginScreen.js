import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import validator from 'validator';
import useForm from '../../hooks/useForm';
import { startGoogleLogin, startLoginWithEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';

const LoginScreen = () => {
    const dispatch = useDispatch();
    const { msgError, loading } = useSelector( store => store.ui );

    const [ formValues, handleInputChange, reset ] = useForm( { email: '', password: '' } );
    const { email, password } = formValues;

    const isFormValid = () => {
        if( !validator.isEmail( email ) || password.length < 5 ) {
            dispatch( setError( 'Alguno de los datos ingresados no es correcto' ) );
            return false;
        }

        return true;
    };

    const handleLogin = ( event ) => {
        event.preventDefault();
        
        if( isFormValid() ) {
            dispatch( removeError() );
            dispatch( startLoginWithEmailPassword( email, password ) );
        }

        reset();
    };

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    };

    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            <h3 className="auth__title">Login</h3>

            <form onSubmit={ handleLogin }>
                { msgError && <div className="auth__alert-error text-center">{ msgError }</div> }

                <input type="email" name="email" value={ email } placeholder="Email" autoComplete="off" className="auth__input" onChange={ handleInputChange }/>
                <input type="password" name="password" value={ password } placeholder="Contraseña" autoComplete="off" className="auth__input" onChange={ handleInputChange }/>

                <button type="Submit" className="btn btn-primary btn-block" disabled={ loading }>Ingresar</button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div className="google-btn" onClick={ handleGoogleLogin }>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button"/>
                        </div>
                        <p className="btn-text">
                            <b>Sign in with Google</b>
                        </p>
                    </div>
                </div>

                <div className="text-center">
                    <Link to="/auth/register" className="link">Create new account</Link>
                </div>
            </form>
        </div>
    )
};

export default LoginScreen;
