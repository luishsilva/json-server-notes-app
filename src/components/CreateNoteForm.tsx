import { useState } from "react";
import { Note } from "../types";

export const CreateNoteForm = ({ createNote, isLoading }: { createNote: (note: Omit<Note, "id">) => void;  isLoading: boolean}) => {

    const [titleInput, setTitleInput] = useState("");
    const [contentInput, setContentInput] = useState("");

    return (
        <form 
            onSubmit={(e) => {
                e.preventDefault();
                createNote({
                    title: titleInput, 
                    content: contentInput
                });
                setTitleInput("");
                setContentInput("");
            }}
        >
            <h2>Create Note Form</h2>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="title" 
                    value={titleInput} 
                    onChange={(e) => {
                        setTitleInput(e.target.value)
                    }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea 
                    name="content" 
                    placeholder="Type content here"
                    value={contentInput}
                    onChange={(e) => {
                        setContentInput(e.target.value)
                    }}
                />
            </div>
            <button type="submit" disabled={isLoading}>{isLoading ? "Submmiting" : "Submit"}</button>
        </form>
    );
}
