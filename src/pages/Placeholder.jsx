// src/pages/Placeholder.jsx
import React from "react";
import "./Placeholder.css";

const Placeholder = ({ page }) => {
  return (
    <main className="main-content">
      <div className="placeholder-wrap">
        <div className="placeholder-icon">🚧</div>
        <h2 className="placeholder-title">{page}</h2>
        <p className="placeholder-text">
          This section is a stub in the demo — everything on the Dashboard
          page (search, notifications, projects, tasks, team, and calendar)
          is fully wired up and interactive.
        </p>
      </div>
    </main>
  );
};

export default Placeholder;
