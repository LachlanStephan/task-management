import { FC, useState, useEffect } from "react";
import styles from "./Notes.module.css";
import todoStyles from "../todos/Todos.module.css";

interface Props {
  title: string;
}

interface Note {
  id: number;
  content: string;
}

const Notes: FC<Props> = (Props) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currNote, setCurrNote] = useState<Note>();
  const [currText, setCurrText] = useState("");

  const newNote = () => {
    setCurrNote(undefined);
    setCurrText("");
  };

  const addNote = () => {
    if (currNote) {
      updateNote(currText);
      return;
    }

    const newId = assignId();
    const newData: Note = {
      id: newId,
      content: currText,
    };

    const x = [...notes];
    x.push(newData);
    localStorage.setItem("notes", JSON.stringify(x));
    setNotes(x);
    setCurrNote(newData);
  };

  const updateNote = (newText: string) => {
    if (currNote) {
      const updatedNote: Note = {
        id: currNote.id,
        content: newText,
      };

      const x = [...notes];

      for (let i = 0; i < x.length; i++) {
        if (x[i].id === currNote.id) {
          x[i].content = currText;
        }
      }

      setCurrNote(updatedNote);
      setNotes(x);

      localStorage.removeItem("notes");
      localStorage.setItem("notes", JSON.stringify(x));
    }
  };

  const assignId = () => {
    const newId = notes.length + 1;
    return newId;
  };

  const updateText = (e: any) => {
    setCurrText(e.target.value);
  };

  // TODO: THIS
  const removeNote = (id: number) => {
    //
  };

  const selectNote = (target_id: number) => {
    const newCurr = notes.find((ele) => ele.id === target_id);

    if (newCurr) {
      setCurrNote(newCurr);
      setCurrText(newCurr.content);
    }
  };

  const setInitialNote = () => {
    const initial = getLocal();
    setNotes(initial);
    setCurrNote(initial[0]);

    const curr: Note = {
      id: initial[0].id,
      content: initial[0].content,
    };

    setCurrNote(curr);
    setCurrText(curr.content);
  };

  const getLocal = () => {
    const local = localStorage.getItem("notes");

    if (local) {
      return JSON.parse(local);
    }
    return [];
  };

  // add this to li val.content
  const limitText = (title: string) => {
    //
  };

  const addNoteWithEnter = (e: any) => {
    //
  };

  useEffect(() => {
    setInitialNote();
  }, []);

  const notesList = notes.map((val, i) => {
    return (
      <li
        id={val.id.toString()}
        onClick={() => selectNote(val.id)}
        key={i}
      >
        {val.content}
      </li>
    );
  });

  return (
    <aside className={styles.main}>
      <h1>{Props.title}</h1>
      <label className={todoStyles.label} htmlFor="addNote"></label>
      <textarea
        value={currText}
        onChange={(e) => updateText(e)}
        className={styles.noteInput}
        id="addNote"
        placeholder="Note..."
      ></textarea>

      <div className={styles.buttonContainer}>
        <button onClick={addNote} className={todoStyles.addBtn}>
          {currNote ? "Edit" : "Go"}
        </button>
        <button onClick={newNote} className={todoStyles.addBtn}>
          New
        </button>
      </div>
      <ul>{notesList}</ul>
    </aside>
  );
};

export default Notes;
