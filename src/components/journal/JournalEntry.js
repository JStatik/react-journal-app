import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import { activeNote } from '../../actions/notes';

const JournalEntry = ( { id, date, title, body, url } ) => {
    const dispatch = useDispatch();
    const noteDate = moment( date );

    const handleEntryClick = () => {
        dispatch( activeNote( id, { date, title, body, url } ) );
    };

    return (
        <div className="journal__entry animate__animated animate__fadeIn" onClick={ handleEntryClick }>
            {
                url && <div className="journal__entry-picture" style={ { backgroundPosition: 'center center', backgroundSize: 'cover', backgroundImage: `url( ${ url } )` } }></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">{ title }</p>
                <p className="journal__entry-content">{ body }</p>
            </div>

            <div className="journal__entry-date-box">
                <span>{ noteDate.format( 'dddd' ) }</span>
                <h4>{ noteDate.format( 'DD/MM/YY' ) }</h4>
            </div>
        </div>
    )
};

JournalEntry.propTypes = {
    id: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
};

export default JournalEntry;
