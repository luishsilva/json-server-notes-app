import { useEffect, useState } from 'react'
import './App.css'
import { Note } from "./types";
import { NotesList } from './components/NotesList';
import { ActiveNote } from './components/ActiveNote';
import { CreateNoteForm } from './components/CreateNoteForm';
import { Requests } from './api';
import { toast } from 'react-hot-toast';

function App() {
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    refetchData();
  }, [])

  const refetchData = () => {
    setIsLoading(true);
    return Requests.getAllNotes()
    .then(setAllNotes)
    .finally(() => {
      setIsLoading(false);
    });
  }

  const createNote = (note: Omit<Note, "id">) => {
    Requests.createNote(note).then(() => {
      setIsLoading(true);
      refetchData()
      .then(() => {
        toast.success('Note created succesfully.', {
          duration: 2000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
    })
  }

  const deleteNote = (id: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        Requests.deleteNotes(id)
            .then(() => {
                refetchData()
                    .then(() => {
                        toast.success('Note deleted with success.');
                        resolve(); // Resolve the Promise when deletion is successful
                    })
                    .catch(error => reject(error)); // Reject the Promise if there's an error with refetching data
            })
            .catch(error => reject(error)); // Reject the Promise if there's an error with deleting the note
    });
};

  return (
    <>
      <h1>Notes App</h1>
      <h4>{isLoading ? "...Loading": ''}</h4>
      <NotesList 
        setActiveNote={(note) => setActiveNote(note)}
        allNotes={allNotes}
        deleteNote={deleteNote}
      />
      <ActiveNote note={activeNote}/>
      <CreateNoteForm createNote={createNote} isLoading={isLoading}/>
    </>
  )
}

export default App
