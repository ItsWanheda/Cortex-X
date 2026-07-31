// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { FiPlus, FiUserPlus, FiFileText } from "react-icons/fi";
import StatCard from "../components/StatCard";
import Activity from "../components/Activity";
import ProjectsTable from "../components/ProjectsTable";
import TaskList from "../components/TaskList";
import TeamMembers from "../components/TeamMembers";
import Modal from "../components/Modal";
import { statsData, activityData } from "../data/mockData";
import "./Dashboard.css";

const chartDatasets = {
  Monthly: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    area: "M0,200 Q100,150 200,170 T400,120 T600,140 T800,80 L800,280 L0,280 Z",
    line: "M0,200 Q100,150 200,170 T400,120 T600,140 T800,80",
    points: [
      { x: 0, y: 200 },
      { x: 200, y: 170 },
      { x: 400, y: 120 },
      { x: 600, y: 140 },
      { x: 800, y: 80 },
    ],
  },
  Weekly: {
    labels: ["W1", "W2", "W3", "W4", "W5"],
    area: "M0,220 Q100,210 200,190 T400,200 T600,110 T800,130 L800,280 L0,280 Z",
    line: "M0,220 Q100,210 200,190 T400,200 T600,110 T800,130",
    points: [
      { x: 0, y: 220 },
      { x: 200, y: 190 },
      { x: 400, y: 200 },
      { x: 600, y: 110 },
      { x: 800, y: 130 },
    ],
  },
  Daily: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    area: "M0,180 Q100,220 200,150 T400,190 T600,90 T800,160 L800,280 L0,280 Z",
    line: "M0,180 Q100,220 200,150 T400,190 T600,90 T800,160",
    points: [
      { x: 0, y: 180 },
      { x: 200, y: 150 },
      { x: 400, y: 190 },
      { x: 600, y: 90 },
      { x: 800, y: 160 },
    ],
  },
};

const emptyProjectForm = {
  name: "",
  status: "Pending",
  dueDate: "",
};

const emptyMemberForm = {
  name: "",
  role: "",
};

const Dashboard = ({
  projects,
  setProjects,
  tasks,
  setTasks,
  team,
  setTeam,
  addToast,
}) => {
  const [chartTab, setChartTab] = useState("Monthly");
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [projectForm, setProjectForm] = useState(emptyProjectForm);
  const [memberForm, setMemberForm] = useState(emptyMemberForm);

  const chart = chartDatasets[chartTab];

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!projectForm.name.trim()) return;
    const newProject = {
      id: Date.now(),
      name: projectForm.name.trim(),
      status: projectForm.status,
      team: ["JD"],
      progress: projectForm.status === "Completed" ? 100 : 0,
      dueDate: projectForm.dueDate || "No due date",
    };
    setProjects((prev) => [newProject, ...prev]);
    setProjectForm(emptyProjectForm);
    setShowProjectModal(false);
    addToast(`Project "${newProject.name}" created`, "success");
  };

  const handleInviteMember = (e) => {
    e.preventDefault();
    if (!memberForm.name.trim() || !memberForm.role.trim()) return;
    const initials = memberForm.name
      .trim()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    const colors = ["#4f46e5", "#10b981", "#f59e0b", "#ec4899", "#06b6d4"];
    const newMember = {
      id: Date.now(),
      name: memberForm.name.trim(),
      role: memberForm.role.trim(),
      avatar: initials,
      color: colors[team.length % colors.length],
      online: false,
    };
    setTeam((prev) => [newMember, ...prev]);
    setMemberForm(emptyMemberForm);
    setShowMemberModal(false);
    addToast(`Invite sent to ${newMember.name}`, "success");
  };

  const handleGenerateReport = () => {
    const rows = [
      ["Metric", "Value"],
      ...statsData.map((s) => [s.title, s.value]),
      [],
      ["Project", "Status", "Progress", "Due Date"],
      ...projects.map((p) => [p.name, p.status, `${p.progress}%`, p.dueDate]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "dashboard-report.csv";
    link.click();
    URL.revokeObjectURL(url);
    addToast("Report generated and downloaded", "success");
  };

  return (
    <main className="main-content">
      <div className="main-header">
        <div>
          <h1 className="page-title">Welcome back, John 👋</h1>
          <p className="page-subtitle">
            Here's what's happening with your projects today
          </p>
        </div>
        <div className="quick-actions">
          <button
            className="action-button primary"
            onClick={() => setShowProjectModal(true)}
          >
            <FiPlus /> Create Project
          </button>
          <button
            className="action-button secondary"
            onClick={() => setShowMemberModal(true)}
          >
            <FiUserPlus /> Invite Member
          </button>
          <button
            className="action-button secondary"
            onClick={handleGenerateReport}
          >
            <FiFileText /> Generate Report
          </button>
        </div>
      </div>

      <section className="stats-grid">
        {statsData.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </section>

      <section className="content-grid">
        <div className="grid-left">
          <div className="revenue-card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Revenue Overview</h3>
                <p className="card-subtitle">Monthly revenue performance</p>
              </div>
              <div className="chart-tabs">
                {Object.keys(chartDatasets).map((tab) => (
                  <button
                    key={tab}
                    className={`chart-tab ${chartTab === tab ? "active" : ""}`}
                    onClick={() => setChartTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="chart-placeholder">
              <svg viewBox="0 0 800 280" className="chart-svg">
                <defs>
                  <linearGradient
                    id="chartGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0, 1, 2, 3].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={56 + i * 56}
                    x2="800"
                    y2={56 + i * 56}
                    stroke="#f3f4f6"
                    strokeWidth="1"
                  />
                ))}
                <path d={chart.area} fill="url(#chartGradient)" />
                <path
                  d={chart.line}
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="3"
                />
                {chart.points.map((point, idx) => (
                  <circle
                    key={idx}
                    cx={point.x}
                    cy={point.y}
                    r="6"
                    fill="white"
                    stroke="#4f46e5"
                    strokeWidth="3"
                  />
                ))}
              </svg>
              <div className="chart-labels">
                {chart.labels.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>
          </div>

          <ProjectsTable
            projects={projects}
            setProjects={setProjects}
            addToast={addToast}
          />
        </div>

        <div className="grid-right">
          <Activity activities={activityData} addToast={addToast} />
          <TaskList tasks={tasks} setTasks={setTasks} />
          <TeamMembers members={team} addToast={addToast} />
        </div>
      </section>

      {showProjectModal && (
        <Modal title="Create Project" onClose={() => setShowProjectModal(false)}>
          <form onSubmit={handleCreateProject}>
            <div className="form-group">
              <label className="form-label">Project name</label>
              <input
                className="form-input"
                type="text"
                autoFocus
                placeholder="e.g. Marketing Site Refresh"
                value={projectForm.name}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={projectForm.status}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, status: e.target.value })
                }
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Review</option>
                <option>Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Due date</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Sep 15, 2026"
                value={projectForm.dueDate}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, dueDate: e.target.value })
                }
              />
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="form-button secondary"
                onClick={() => setShowProjectModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="form-button primary">
                Create Project
              </button>
            </div>
          </form>
        </Modal>
      )}

      {showMemberModal && (
        <Modal title="Invite Member" onClose={() => setShowMemberModal(false)}>
          <form onSubmit={handleInviteMember}>
            <div className="form-group">
              <label className="form-label">Full name</label>
              <input
                className="form-input"
                type="text"
                autoFocus
                placeholder="e.g. Priya Nair"
                value={memberForm.name}
                onChange={(e) =>
                  setMemberForm({ ...memberForm, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Role</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. UX Researcher"
                value={memberForm.role}
                onChange={(e) =>
                  setMemberForm({ ...memberForm, role: e.target.value })
                }
              />
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="form-button secondary"
                onClick={() => setShowMemberModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="form-button primary">
                Send Invite
              </button>
            </div>
          </form>
        </Modal>
      )}
    </main>
  );
};

export default Dashboard;
