import { FC } from "react";
import styles from "./Header.module.css";

interface Props {
  title: string;
}

const Header: FC<Props> = (Props) => {
  return (
    <header className={styles.header}>
      <h1>{Props.title}</h1>
    </header>
  );
};

export default Header;
