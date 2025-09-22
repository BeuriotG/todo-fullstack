import { Outlet } from "react-router";
import styles from "../../ui/Task.module.css";
import Logout from "../auth/Logout";

export default function TaskLayout() {
  return (
    <div>
      <header className={styles.header}>
        <h1>C'est le Layout des tâches</h1>
        <Logout />
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
