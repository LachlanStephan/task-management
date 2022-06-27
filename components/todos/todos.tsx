import { FC, useState, useEffect } from "react";
import styles from "./Todos.module.css";
import List from "./todoList";

interface Props {
  title: string;
}

const Todos: FC<Props> = (Props) => {
  const [todos, setTodos] = useState<string[]>([]);
  const [currText, setCurrText] = useState("");

  const setInitialTodos = () => {
    const items: string[] | [] = checkLocal();
    setTodos(items);
  };

  const checkEnter = (e: any) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      addTodo();
    }
  };

  const updateText = (e: any) => {
    setCurrText(e.target.value);
  };

  const clearText = () => {
    setCurrText("");
  };

  const removeTodo = (i: number) => {
    todos.splice(i, 1);
    setTodos([...todos]);
    updateLocal();
  };

  const addTodo = () => {
    todos.push(currText);
    clearText();
    updateLocal();
    console.log(localStorage.getItem("todos"));
  };

  const updateLocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const checkLocal = (): [] => {
    const localItems: string | null = localStorage.getItem("todos");
    if (localItems) {
      return JSON.parse(localItems);
    }
    return [];
  };

  useEffect(() => {
    setInitialTodos();
  }, []);

  return (
    <>
      <aside className={styles.main}>
        <h1>{Props.title}</h1>
        <label className={styles.label} htmlFor="addInput"></label>
        <input
          placeholder="Todo..."
          className={styles.textBar}
          id="addInput"
          name="addInput"
          value={currText}
          type="text"
          onKeyDown={(e) => checkEnter(e)}
          onChange={(e) => {
            updateText(e);
          }}
        />

        <button className={styles.addBtn} onClick={() => addTodo()}>Go</button>

        <ul className={styles.list}>
          <List data={todos} removeTodo={removeTodo} />
        </ul>
      </aside>
    </>
  );
};

export default Todos;
