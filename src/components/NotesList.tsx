import { Dispatch, SetStateAction } from 'react'
import { Note } from '../types'

export const NotesList = ( 
    {allNotes, setActiveNote, deleteNote}: 
    {allNotes: Note[], 
     setActiveNote: Dispatch<SetStateAction<Note | null>>,
     deleteNote: (id: string) => Promise<void>}) => (
    <section className='notes-list'>
        <h3>All notes</h3>
        <div className="d-flex flex-column max-width-200">
            {allNotes.map((note) => (
                <div key={note.id}  className='d-flex justify-content-between border-1 p-3'>
                    <div 
                        onClick={() => {setActiveNote(note)}}
                        className='width-50 cursor-pointer'
                    >
                        {note.title}
                    </div>
                    <div 
                        className='cursor-pointer'
                        onClick={() => {deleteNote(note.id)}}
                    >
                        Delete
                    </div>
                </div>
            ))}
        </div>
    </section>
)