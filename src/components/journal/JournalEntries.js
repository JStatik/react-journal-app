import React from 'react';
import { useSelector } from 'react-redux';
import JournalEntry from './JournalEntry';

const JournalEntries = () => {
    const { notes } = useSelector( store => store.notes );
    notes.sort( ( a, b ) => (
        b.date - a.date
    ) );

    return (
        <div className="journal__entries">
            {
                notes.map( note => (
                    <JournalEntry key={ note.id } { ...note } />
                ) )
            }
        </div>
    )
};

export default JournalEntries;
