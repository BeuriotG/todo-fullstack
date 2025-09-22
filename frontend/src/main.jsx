import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Auth from "./components/auth/Auth.jsx";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import TaskList from "./components/tasks/TaskList.jsx";
import TaskItem from "./components/tasks/TaskItem.jsx";
import TaskLayout from "./components/tasks/TaskLayout.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/task" element={<TaskLayout />}>
          <Route index element={<TaskList />} />
          <Route path=":id" element={<TaskItem />} />
        </Route>
        <Route path="auth" element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
