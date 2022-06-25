import { FC } from "react";
import styles from "./Notes.module.css";

interface Props {
  title: string;
}

const Notes: FC<Props> = (Props) => {
  return (
    <aside className={styles.main}>
      <h1>{Props.title}</h1>
    </aside>
  );
};

export default Notes;
