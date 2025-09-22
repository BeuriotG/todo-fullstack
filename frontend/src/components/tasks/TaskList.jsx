import { useState, useEffect } from "react";
import { getTaskList, createTask, deleteTaskId } from "../../api/task";
import { useNavigate } from "react-router";
export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const taskList = await getTaskList();
      if (!taskList) {
        return;
      }
      setTasks(taskList);
    } catch (err) {
      console.error(err);
    }
  };

  const submitTask = async (e) => {
    e.preventDefault();
    const body = taskForm;
    const data = await createTask(body);
    if (!data) {
      console.error(data.message);
    } else {
      fetchTasks();
    }
    setTaskForm({
      title: "",
      description: "",
    });
  };

  return (
    <section>
      <form onSubmit={submitTask}>
        <input
          type="text"
          value={taskForm.title}
          onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
          placeholder="titre de votre tâche"
        />
        <textarea
          value={taskForm.description}
          onChange={(e) =>
            setTaskForm({ ...taskForm, description: e.target.value })
          }
          rows="10"
          placeholder="description de votre tâche"
        ></textarea>
        <button type="submit">Créer une tâche</button>
      </form>
      <DisplayableTasks tasks={tasks} fetchTasks={fetchTasks} />
    </section>
  );
}

function DisplayableTasks({ tasks, fetchTasks }) {
  const deleteTask = async (e, _id) => {
    e.preventDefault();
    const data = await deleteTaskId(_id);
    if (!data) {
      console.error(data.message);
    } else {
      fetchTasks();
    }
  };
  const navigate = useNavigate();
  if (!tasks) {
    return;
  }
  return (
    <ul>
      {tasks.map((task) => {
        return (
          <div>
            <li key={task._id}>{task.title}</li>
            <button onClick={() => navigate(`/task/${task._id}`)}>
              Voir la tâche
            </button>
            <button onClick={(e) => deleteTask(e, task._id)}>
              Supprimer la tâche
            </button>
          </div>
        );
      })}
    </ul>
  );
}
