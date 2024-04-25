import { Note } from '../types';

export const ActiveNote = ({note}: {note: Note | null}) => (
    <section className="my-note">
    <h3>My notes</h3>
    <div><b>Title:</b> {note?.title}</div>
    <div><b>Content:</b> {note?.content}</div>
    </section>
)