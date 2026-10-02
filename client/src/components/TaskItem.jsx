import { useState } from "react";

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.title);

  const saveEdit = () => {
    if (text.trim() && text !== task.title) onUpdate(task._id, { title: text });
    setEditing(false);
  };

  return (
    <li className="task">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onUpdate(task._id, { completed: !task.completed })}
      />
      {editing ? (
        <input
          className="edit-input"
          value={text}
          autoFocus
          onChange={(e) => setText(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => e.key === "Enter" && saveEdit()}
        />
      ) : (
        <span className={task.completed ? "done" : ""}>{task.title}</span>
      )}
      <div className="actions">
        <button className="ghost" onClick={() => setEditing(true)}>Edit</button>
        <button className="danger" onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </li>
  );
}
