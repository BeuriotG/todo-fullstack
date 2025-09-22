import "./App.css";
import { NavLink } from "react-router";
export default function App() {
  return <Dashboard />;
}

function Dashboard() {
  return (
    <>
      <div className="path-task">
        <NavLink to={"/task"}>Mes tâches</NavLink>
      </div>
    </>
  );
}
