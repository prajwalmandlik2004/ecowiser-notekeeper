import React from 'react';
import './Note.css';
import '../App.js'

const Note = ({ note, onEdit, onDelete }) => {

    return (
        <div className="note">
            <div className="note-content">
                <h2>{note.title}</h2>
                <p>{note.tags}</p>
                <p>{note.body}</p>
            </div>
            <div className="note-meta">
                <button className="edit" onClick={() => onEdit(note)}>Edit</button>
                <button className="delete" onClick={() => onDelete(note.id)}>Delete</button>
            </div>

        </div>
    );
};

export default Note;


