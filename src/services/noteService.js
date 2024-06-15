// src/services/noteService.js
import { collection, addDoc, getDocs, query, orderBy, limit , updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const addNote = async (note) => {
    await addDoc(collection(db, 'notes'), {
        ...note,
        createdAt: new Date()
    });
};

export const getNotes = async (page, limitPerPage) => {
    const q = query(collection(db, 'notes'), orderBy('createdAt', 'desc'), limit(limitPerPage));
    const querySnapshot = await getDocs(q);

    const notes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return notes;
};

export const updateNote = async (id, updatedNote) => {
    const noteDoc = doc(db, 'notes', id);
    await updateDoc(noteDoc, updatedNote);
};

export const deleteNote = async (id) => {
    const noteDoc = doc(db, 'notes', id);
    await deleteDoc(noteDoc);
};
