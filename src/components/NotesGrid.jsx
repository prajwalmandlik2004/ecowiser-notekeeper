import React from 'react';
import Note from './Note';
import './NotesGrid.css';

const NotesGrid = ({ notes, onEdit, onDelete }) => {
    return (
        <div className="notes-grid">
            {notes.map((note) => (
                <Note key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default NotesGrid;

