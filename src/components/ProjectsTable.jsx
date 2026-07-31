// src/components/ProjectsTable.jsx
import React, { useState, useMemo } from "react";
import { FiChevronUp, FiChevronDown, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import "./ProjectsTable.css";

const statusColors = {
  Completed: { bg: "#d1fae5", color: "#059669" },
  "In Progress": { bg: "#dbeafe", color: "#2563eb" },
  Review: { bg: "#fef3c7", color: "#d97706" },
  Pending: { bg: "#fee2e2", color: "#dc2626" },
};

const columns = [
  { key: "name", label: "Project" },
  { key: "status", label: "Status" },
  { key: "team", label: "Team", sortable: false },
  { key: "progress", label: "Progress" },
  { key: "dueDate", label: "Due Date" },
];

const ProjectsTable = ({ projects, setProjects, addToast }) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [selectedProject, setSelectedProject] = useState(null);

  const sortedProjects = useMemo(() => {
    if (!sortKey) return projects;
    const sorted = [...projects].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") {
        return av - bv;
      }
      return String(av).localeCompare(String(bv));
    });
    return sortDir === "asc" ? sorted : sorted.reverse();
  }, [projects, sortKey, sortDir]);

  const handleSort = (key, sortable) => {
    if (sortable === false) return;
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const handleDelete = (id, name) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setSelectedProject(null);
    addToast && addToast(`Project "${name}" deleted`, "info");
  };

  return (
    <div className="projects-card">
      <div className="card-header">
        <h3 className="card-title">Projects</h3>
        <span className="table-hint">Click a row for details, headers to sort</span>
      </div>

      <div className="table-wrapper">
        <table className="projects-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key, col.sortable)}
                  className={col.sortable === false ? "" : "sortable-th"}
                >
                  <span className="th-inner">
                    {col.label}
                    {col.sortable !== false && sortKey === col.key && (
                      <span className="sort-icon">
                        {sortDir === "asc" ? <FiChevronUp /> : <FiChevronDown />}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedProjects.map((project) => {
              const status = statusColors[project.status] || statusColors.Pending;
              return (
                <tr key={project.id} onClick={() => setSelectedProject(project)}>
                  <td>
                    <div className="project-name">
                      <div className="project-icon">
                        {project.name.charAt(0)}
                      </div>
                      <span>{project.name}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: status.bg,
                        color: status.color,
                      }}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td>
                    <div className="team-avatars">
                      {project.team.slice(0, 3).map((member, idx) => (
                        <div
                          key={idx}
                          className="team-avatar"
                          style={{
                            backgroundColor:
                              ["#4f46e5", "#10b981", "#f59e0b", "#ec4899"][
                                idx % 4
                              ],
                          }}
                        >
                          {member}
                        </div>
                      ))}
                      {project.team.length > 3 && (
                        <div className="team-avatar more">
                          +{project.team.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="progress-wrapper">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="progress-text">
                        {project.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="due-date">{project.dueDate}</td>
                </tr>
              );
            })}
            {sortedProjects.length === 0 && (
              <tr>
                <td colSpan={5} className="empty-row">
                  No projects yet — create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedProject && (
        <Modal
          title={selectedProject.name}
          onClose={() => setSelectedProject(null)}
        >
          <div className="detail-row">
            <span className="detail-label">Status</span>
            <span className="detail-value">{selectedProject.status}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Progress</span>
            <span className="detail-value">{selectedProject.progress}%</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Due Date</span>
            <span className="detail-value">{selectedProject.dueDate}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Team</span>
            <span className="detail-value">
              {selectedProject.team.join(", ")}
            </span>
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="form-button secondary danger-text"
              onClick={() =>
                handleDelete(selectedProject.id, selectedProject.name)
              }
            >
              <FiTrash2 style={{ marginRight: 6, verticalAlign: "-2px" }} />
              Delete Project
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProjectsTable;
