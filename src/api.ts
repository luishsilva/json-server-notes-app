import { Note } from "./types";

const BASE_URL = "http://localhost:3000";

export const Requests = {
    /**
     * Retrieves all notes from the server.
     * @returns {Promise<Note[]>} A promise that resolves to an array of notes.
     */
    getAllNotes: (): Promise<Note[]> => 
        fetch(`${BASE_URL}/notes`)
        .then((response) => response.json()),

     /**
     * Creates a new note.
     * @param {Omit<Note, "id">} note The note object to create.
     * @returns {Promise<Note[]>} A promise that resolves to an array of notes.
     */
    createNote: (note: Omit<Note, "id">)  => (
        fetch(`${BASE_URL}/notes`,{
            body: JSON.stringify(note),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => response.json())
    ),
    deleteNotes: (id: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}/notes/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                if (!response.ok) {
                    reject(new Error("Failed to delete note"));
                } else {
                    resolve(); // Resolve the Promise when deletion is successful
                }
            }).catch((error) => {
                reject(error); // Reject the Promise if there's an error with the fetch operation
            });
        });
    }
};