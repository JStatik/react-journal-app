import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithNameEmailPassword } from '../../actions/auth';
import useForm from '../../hooks/useForm';

const RegisterScreen = () => {
    const dispatch = useDispatch();
    const { msgError, loading } = useSelector( store => store.ui );

    const [ formValues, handleInputChange, reset ] = useForm( { name: '', email: '', password: '', password2: '' } );
    const { name, email, password, password2 } = formValues;

    const isFormValid = () => {
        if( name.trim().length === 0 ) {
            dispatch( setError( 'Ingrese un nombre válido' ) );
            return false;
        } else if( !validator.isEmail( email ) ) {
            dispatch( setError( 'El email no es válido' ) );
            return false;
        } else if( password !== password2 ) {
            dispatch( setError( 'Las contraseñas no coinciden' ) );
            return false;
        } else if( password.length < 5 ) {
            dispatch( setError( 'La contraseña debe tener al menos 6 caracteres' ) );
            return false;
        }

        return true;
    };

    const handleRegister = ( event ) => {
        event.preventDefault();

        if( isFormValid() ) {
            dispatch( removeError() );
            dispatch( startRegisterWithNameEmailPassword( name, email, password ) );
        }

        reset();
    };

    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            <h3 className="auth__title">Register</h3>

            <form onSubmit={ handleRegister }>
                { msgError && <div className="auth__alert-error text-center">{ msgError }</div> }

                <input type="text" name="name" value={ name } placeholder="Nombre" autoComplete="off" className="auth__input" onChange={ handleInputChange }/>
                <input type="email" name="email" value={ email } placeholder="Email" autoComplete="off" className="auth__input" onChange={ handleInputChange }/>
                <input type="password" name="password" value={ password } placeholder="Contraseña" autoComplete="off" className="auth__input" onChange={ handleInputChange }/>
                <input type="password" name="password2" value={ password2 } placeholder="Repetir contraseña" autoComplete="off" className="auth__input" onChange={ handleInputChange }/>

                <button type="Submit" className="btn btn-primary btn-block mb-5" disabled={ loading }>Registrarse</button>

                <div className="text-center">
                    <Link to="/auth/login" className="link">Already registered?</Link>
                </div>
            </form>
        </div>
    )
};

export default RegisterScreen;
