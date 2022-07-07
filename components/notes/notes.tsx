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
      updateLocal(x);
    }
  };

  const updateLocal = (x: Note[]) => {
    localStorage.removeItem("notes");
    localStorage.setItem("notes", JSON.stringify(x));
  };

  const assignId = () => {
    const newId = notes.length + 1;
    return newId;
  };

  const updateText = (e: any) => {
    setCurrText(e.target.value);
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

    if (!initial) {
      newNote();
      return;
    }

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
    return false;
  };

  // add this to li val.content
  const limitText = (title: string, limit: number) => {
    let x = title.split("");

    if (x.length <= limit) {
      return x;
    }

    const len = x.length;
    const remaining = len - limit;
    x.splice(limit, remaining);
    x.join();
    return x;
  };

  const checkKeyCombos = (e: any) => {
    if (e.ctrlKey && e.keyCode === 13) {
      addNote();
    }
    if (e.shiftKey && e.keyCode === 13) {
      newNote();
    }
  };

  const removeNote = (i: number) => {
    const x = [...notes];
    x.splice(i, 1);
    setNotes(x);
    updateLocal(x);
    newNote();
  };

  useEffect(() => {
    setInitialNote();
  }, []);

  const notesList = notes.map((val, i) => {
    return (
      <div key={i} className={styles.listContainer}>
        <button onClick={() => removeNote(i)} className={todoStyles.remove}>
          X
        </button>
        <li
          className={styles.li}
          id={val.id.toString()}
          onClick={() => selectNote(val.id)}
        >
          {limitText(val.content, 20)}
        </li>
      </div>
    );
  });

  return (
    <aside className={styles.main}>
      <h1>{Props.title}</h1>
      <label className={todoStyles.label} htmlFor="addNote"></label>
      <textarea
        value={currText}
        onChange={(e) => updateText(e)}
        onKeyDown={(e) => checkKeyCombos(e)}
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
      <ul className={styles.ul}>{notesList}</ul>
    </aside>
  );
};

export default Notes;
