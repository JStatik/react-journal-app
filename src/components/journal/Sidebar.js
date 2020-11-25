import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { noteLogout, startNewNote } from '../../actions/notes';
import JournalEntries from './JournalEntries';

const Sidebar = () => {
    const dispatch = useDispatch();
    const { name, photoURL } = useSelector( store => store.auth );
    const imgUser = photoURL ? <img src={ photoURL } alt="Usuario" className="journal__img-user"/> : <i className="fas fa-user"></i>;

    const handleLogout = () => {
        dispatch( startLogout() );
        dispatch( noteLogout() );
    };

    const handleNewEntry = () => {
        dispatch( startNewNote() );
    };

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar text-center mt-1 mb-1">
                <h2>{ imgUser }<span> { name }</span></h2>

                <button className="btn" onClick={ handleLogout }>Logout</button>
            </div>

            <div className="journal__new-entry" onClick={ handleNewEntry }>
                <i className="fas fa-calendar-plus fa-5x"></i>
                <p className="mt-1">New Entry</p>
            </div>

            <JournalEntries />
        </aside>
    )
};

export default Sidebar;
