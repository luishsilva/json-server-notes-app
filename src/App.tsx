import { useEffect, useState } from 'react'
import './App.css'
import { Note } from "./types";
import { NotesList } from './components/NotesList';
import { ActiveNote } from './components/ActiveNote';
import { CreateNoteForm } from './components/CreateNoteForm';
import { Requests } from './api';

function App() {
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [allNotes, setAllNotes] = useState<Note[]>([]);

  useEffect(() => {
    refetchData();
  }, [])

  const refetchData = () => (
    Requests.getAllNotes().then(setAllNotes)
  )

  const createNote = (note: Omit<Note, "id">) => {
    Requests.createNote(note).then(() => {
      refetchData();
    })
  }

  return (
    <>
      <h1>Notes App</h1>
      <NotesList 
        setActiveNote={(note) => setActiveNote(note)}
        allNotes={allNotes}
      />
      <ActiveNote note={activeNote}/>
      <CreateNoteForm createNote={createNote}/>
    </>
  )
}

export default App
