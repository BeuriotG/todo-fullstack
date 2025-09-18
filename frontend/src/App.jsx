import { useState } from "react";
import "./App.css";
import { login, signup } from "../api/auth";
import { getTaskList } from "../api/task";

export default function App() {
  return <Dashboard />;
}

function Dashboard() {
  return (
    <>
      <LoginForm />
      <SignupForm />
      <TaskList />
    </>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = async (e) => {
    e.preventDefault();
    const token = await login(email, password);
    localStorage.setItem("token", token);
    setEmail("");
    setPassword("");
  };
  return (
    <section>
      <h2>Formulaire de login</h2>
      <form onSubmit={handlelogin} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="mot de passe"
        />
        <button type="submit">Valider le formulaire</button>
      </form>
    </section>
  );
}

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerif, setPasswordVerif] = useState("");
  const [messageSignup, setMessageSignUp] = useState(
    "En attente de validation formulaire"
  );

  const handlesignup = async (e) => {
    e.preventDefault();
    if (password !== passwordVerif) {
      setPassword("");
      setPasswordVerif("");
      return setMessageSignUp("Mot de passe différents");
    } else {
      const message = await signup(email, password);
      setMessageSignUp(message);
      setEmail("");
      setPassword("");
      setPasswordVerif("");
    }
  };
  return (
    <section>
      <h2>Formulaire d'inscription</h2>
      <form onSubmit={handlesignup} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="mot de passe"
        />
        <input
          type="password"
          value={passwordVerif}
          onChange={(e) => setPasswordVerif(e.target.value)}
          required
          placeholder="vérification de mot de passe"
        />
        <button type="submit">Valider le formulaire</button>
      </form>
      <h3>Votre status d'inscription: {messageSignup}</h3>
    </section>
  );
}

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    try {
      const taskList = await getTaskList();
      setTasks(taskList);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button onClick={fetchTasks}>Afficher les tâches</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </>
  );
}
