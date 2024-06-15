import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NotesGrid from './components/NotesGrid';
import Pagination from './components/Pagination';
import { addNote, getNotes, updateNote, deleteNote } from './services/noteService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const notesPerPage = 6;

  useEffect(() => {
    fetchNotes();
  }, [currentPage]);

  const fetchNotes = async () => {
    const fetchedNotes = await getNotes();
    setNotes(fetchedNotes);
    setFilteredNotes(fetchedNotes);
  };

  const handleAddNote = async (note) => {
    if (noteToEdit) {
      await updateNote(noteToEdit.id, note);
      toast.success('Note updated successfully');
    } else {
      await addNote({
        ...note,
        createdAt: new Date()
      });
      toast.success('Note added successfully');
    }
    setNoteToEdit(null);
    fetchNotes();
  };

  const handleEditNote = (note) => {
    setNoteToEdit(note);
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    toast.success('Note deleted successfully');
    fetchNotes();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm) ||
      note.body.toLowerCase().includes(searchTerm) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    setFilteredNotes(filtered);
  };

  return (
    <div className="App">
      <header className="navbar">
        <div className="navbar-left">
          <img src="logo.png" alt="Logo" className="logo" />
          <h1>Note Keeper</h1>
        </div>
        <div className="navbar-right">
          <input
            type="text"
            placeholder="Search notes..."
            className="search-bar"
            onChange={handleSearch}
          />
        </div>
      </header>
      <NoteForm onSubmit={handleAddNote} noteToEdit={noteToEdit} />
      <NotesGrid notes={filteredNotes.slice((currentPage - 1) * notesPerPage, currentPage * notesPerPage)} onEdit={handleEditNote} onDelete={handleDeleteNote} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredNotes.length / notesPerPage)}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default App;


