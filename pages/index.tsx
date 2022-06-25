import type { NextPage } from "next";
import Todos from "../components/todos/todos";
import Notes from "../components/notes/notes";
import Header from "../components/header/header";
import styles from  "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <main className={styles.main}>
        <Header title="" />
        <section className={styles.section}>
          <Todos title="Todos" />
          <Notes title="Notes" />
        </section>
      </main>
    </>
  );
};

export default Home;
