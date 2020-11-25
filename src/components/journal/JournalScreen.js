import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import NoteScreen from '../notes/NoteScreen';
import NothingSelected from './NothingSelected';

const JournalScreen = () => {
    const { active } = useSelector( store => store.notes );

    return (
        <div className="journal__main-content animate__animated animate__fadeIn">
            <Sidebar />

            <main>
                { active ? <NoteScreen /> : <NothingSelected />  }
            </main>
        </div>
    )
};

export default JournalScreen;
