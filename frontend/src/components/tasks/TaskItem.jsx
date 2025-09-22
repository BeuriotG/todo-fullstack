import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getTaskId, updateTaskId } from "../../api/task";

export default function TaskItem() {
  const params = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    createdAt: null,
  });

  const [modifiedTask, setModifiedTask] = useState({
    title: "",
    description: "",
  });

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchTaskId = async () => {
      try {
        const task = await getTaskId(params.id);
        setTask({
          title: task.title,
          description: task.description,
          createdAt: task.createdAt,
        });
        setModifiedTask({
          title: task.title,
          description: task.description,
          createdAt: task.createdAt,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchTaskId();
  }, [params.id, refreshTrigger]);

  async function updateTask(e) {
    e.preventDefault();
    const payload = modifiedTask;
    try {
      await updateTaskId(params.id, payload);
      setRefreshTrigger((prev) => prev + 1);
      navigate("/task");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section>
      <form onSubmit={updateTask}>
        <input
          type="text"
          value={modifiedTask.title}
          onChange={(e) =>
            setModifiedTask({ ...modifiedTask, title: e.target.value })
          }
        />
        <textarea
          value={modifiedTask.description}
          onChange={(e) =>
            setModifiedTask({ ...modifiedTask, description: e.target.value })
          }
          rows="10"
        ></textarea>
        <p>{task.createdAt}</p>

        <button type="submit">Modifier ma tâche</button>
        <button onClick={() => navigate("/task")}>
          Annuler ma modification
        </button>
      </form>
    </section>
  );
}
