// src/components/NoteForm.jsx
import React, { useState, useEffect } from 'react';
import './NoteForm.css';

const NoteForm = ({ onSubmit, noteToEdit }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (noteToEdit) {
            setTitle(noteToEdit.title || '');
            setBody(noteToEdit.body || '');
            setTags(noteToEdit.tags ? noteToEdit.tags : []);
        } else {
            setTitle('');
            setBody('');
            setTags([]);
        }
    }, [noteToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, body, tags });
        setTitle('');
        setBody('');
        setTags([]);
    };

    return (
        <form onSubmit={handleSubmit} className="note-form">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Tagline"
                value={tags.join(', ')} // Display tags as a comma-separated string
                onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
            />
            <textarea
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <button type="submit">{noteToEdit ? 'Update Note' : 'Save Note'}</button>
        </form>
    );
};

export default NoteForm;
