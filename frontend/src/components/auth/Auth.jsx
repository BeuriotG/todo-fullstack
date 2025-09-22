import { Outlet } from "react-router";
import styles from "../../ui/Auth.module.css";

export default function Auth() {
  return (
    <>
      <header className={styles.header}>
        <h1>Parcours d'authentification</h1>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}
