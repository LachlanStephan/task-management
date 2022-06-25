import { FC } from "react";
import styles from "./Todos.module.css";

interface Props {
  data: string[];
  removeTodo: Function;
}

const List: FC<Props> = (Props) => {
  const passIndex = (i: number) => {
    return i;
  };

  const todoList = Props.data.map((val: string, i: number) => {
    return (
      <div className={styles.todoItem} key={i}>
        <button   
          className={styles.remove}
          onClick={() => {
            Props.removeTodo(passIndex(i));
          }}
        >
          X
        </button>
        <li className={styles.item}>{val}</li>
      </div>
    );
  });

  return <>{todoList}</>;
};

export default List;
