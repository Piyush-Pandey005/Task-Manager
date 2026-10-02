import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api.js";
import TaskItem from "../components/TaskItem.jsx";

export default function Dashboard({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getTasks().then(setTasks).catch((err) => setError(err.message));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const task = await createTask(title);
      setTasks([task, ...tasks]);
      setTitle("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const updated = await updateTask(id, updates);
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="card wide">
        <div className="header">
          <h2>Hello, {user.name}</h2>
          <button className="ghost" onClick={onLogout}>Logout</button>
        </div>

        <form className="add-form" onSubmit={handleAdd}>
          <input placeholder="Add a new task..." value={title} onChange={(e) => setTitle(e.target.value)} />
          <button type="submit">Add</button>
        </form>

        {error && <p className="error">{error}</p>}

        {tasks.length === 0 ? (
          <p className="empty">No tasks yet. Add your first one!</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task} onUpdate={handleUpdate} onDelete={handleDelete} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
