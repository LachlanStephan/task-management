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

  const addNote = () => {
    const newId = assignId();
    const newData: Note = {
      id: newId,
      content: currText,
    }
    const x = [... notes];
    x.push(newData)
    setNotes(x)
  }

  const assignId = () => {
    const newId = notes.length + 1;
    return newId;
  }

  const updateText = (e: any) => {
    setCurrText(e.target.value)
    console.log(currText)
  }

  const removeNote = (id: number) => {
    //
  }

  const selectNote = (id: number) => {
    //
  }

  // this does not work - newCurr is corrext but setCurrNote is
  // still the old note - not updating correctly
  const swapNote = (target_id: number) => {
    console.log(target_id);
    console.log(notes)
    const newCurr = notes.find(ele => ele.id === target_id);
    console.log(newCurr)
    if (newCurr) {
      setCurrNote(newCurr)
    }
    console.log(currNote);
  }

  // add this to li val.content
  const limitText = (title: string) => {
    //
  }

  const currNotes = notes.map((val, i) => { 
    return (
      <li id={val.id.toString()} onClick={() => swapNote(val.id)} key={val.id}>{val.content}</li>
    );
  });

  return (
    <aside className={styles.main}>
      <h1>{Props.title}</h1>
      <label className={todoStyles.label} htmlFor="addNote">Add</label>
      <textarea onChange={(e) => updateText(e)} className={styles.noteInput} id="addNote" placeholder="Note..." ></textarea>

      <button onClick={addNote} className={todoStyles.addBtn}>Go</button>
    <ul>
      {currNotes}
    </ul>
    </aside>
  );
};

export default Notes;
