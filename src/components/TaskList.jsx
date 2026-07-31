// src/components/TaskList.jsx
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import "./TaskList.css";

const TaskList = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState("");

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = (e) => {
    e.preventDefault();
    const title = newTask.trim();
    if (!title) return;
    setTasks([...tasks, { id: Date.now(), title, completed: false }]);
    setNewTask("");
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const pct = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="task-list-card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Today's Tasks</h3>
          <p className="task-subtitle">
            {completedCount} of {totalCount} completed
          </p>
        </div>
        <div className="task-progress-ring">
          <svg viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="3"
              strokeDasharray={`${pct}, 100`}
              strokeLinecap="round"
            />
          </svg>
          <span className="ring-text">{pct}%</span>
        </div>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <label className="task-label">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="task-checkbox"
              />
              <span className="checkbox-custom">
                {task.completed && (
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3 4.2L6.5 11L2.7 7.2L3.8 6.1L6.5 8.8L12.2 3.1L13.3 4.2Z"
                      fill="white"
                    />
                  </svg>
                )}
              </span>
              <span
                className={`task-text ${task.completed ? "completed" : ""}`}
              >
                {task.title}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <form className="add-task-form" onSubmit={addTask}>
        <input
          type="text"
          className="add-task-input"
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="add-task-button" aria-label="Add task">
          <FiPlus />
        </button>
      </form>
    </div>
  );
};

export default TaskList;
