import { useState, type FormEvent } from "react";

const notesData: Note[]= [
  {
    id: 1,
    title: "Learn React",
    category: "Study",
    pinned: false,
  },
  {
    id: 2,
    title: "Buy groceries",
    category: "Personal",
    pinned: true,
  },
];

interface Note {
    id: number;
    title: string;
    category: "Study" | "Work" | "Personal";
    pinned: boolean;
}

interface NotesListProps {
    notesData: Note[];
}

interface NoteCardProps {
    note: Note;
    handleTogglePinned: (id: number) => void;
    handleDelete: (id: number) => void;
}

export const App = () => {
    return (<NotesList notesData={notesData} />)
}

export const NotesList = ({notesData}: NotesListProps) => {

    const [notes, setNotes] = useState<Note[]>(notesData);
    const [input, setInput] = useState<string>("");


    const handleTogglePinned = (id: number) {

        setNotes((prev) => (
            prev.map((note) => (
                note.id === id 
                ? {...note, pinned: !note.pinned}
                : note
            ))
        ))
    }

    const handleDelete = (id: number) {

        setNotes((prev) => (
            prev.filter((note) => (
                note.id !== id   
            ))
        ))

    }

    const handleAddNote = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const newNote: Note = {
            id: Date.now(),
            title: input,
            category: "Personal",
            pinned: false
        }

        setNotes((prev) => (
            [...prev, newNote]
        ));

        setInput("");
    }

    return(
        <>
            {
                notes.map((note) => (
                    <NoteCard 
                        key={note.id}
                        note={note}
                        handleTogglePinned={handleTogglePinned}
                        handleDelete={handleDelete}
                        />
                ))
            }

            <form onSubmit={handleAddNote}>
                <input value={input} onChange={(event) => setInput(event.target.value)}></input>
                <button>Add note</button>
            </form>
        </>
    )
}

export const NoteCard = ({note, handleTogglePinned, handleDelete}: NoteCardProps) => {
    return (
        <>
            <div>{note.title}</div>
            <div>{note.category}</div>
            <div>{note.pinned ? "Pinned" : "Not Pinned"}</div>

            <button onClick={() => handleTogglePinned(note.id)}>[Toggle Pin]</button>
            <button onClick={() => handleDelete(note.id)}>[Delete]</button>
        </>
    )
}