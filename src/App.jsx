// src/App.jsx
import React, { useState, useCallback } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import RightSidebar from "./components/RightSidebar";
import Dashboard from "./pages/Dashboard";
import Placeholder from "./pages/Placeholder";
import { ToastContainer } from "./components/Toast";
import {
  projectsData,
  tasksData,
  teamData,
  meetingsData,
  notificationsData,
} from "./data/mockData";
import "./pages/Dashboard.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  // Shared state lifted up so Header search + notifications stay in sync
  // with what's actually happening on the Dashboard page.
  const [projects, setProjects] = useState(projectsData);
  const [tasks, setTasks] = useState(tasksData);
  const [team, setTeam] = useState(teamData);
  const [notifications, setNotifications] = useState(notificationsData);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleNavigate = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
    if (page === "Logout") {
      addToast("You've been logged out (demo only)", "info");
      setTimeout(() => setActivePage("Dashboard"), 1500);
    }
  };

  return (
    <div className="dashboard-layout">
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        projects={projects}
        tasks={tasks}
        team={team}
        notifications={notifications}
        setNotifications={setNotifications}
        addToast={addToast}
        onNavigate={handleNavigate}
      />
      <div className="dashboard-body">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activePage={activePage}
          onNavigate={handleNavigate}
        />

        {activePage === "Dashboard" ? (
          <Dashboard
            projects={projects}
            setProjects={setProjects}
            tasks={tasks}
            setTasks={setTasks}
            team={team}
            setTeam={setTeam}
            addToast={addToast}
          />
        ) : (
          <Placeholder page={activePage} />
        )}

        <RightSidebar
          meetings={meetingsData}
          notifications={notifications}
          setNotifications={setNotifications}
          addToast={addToast}
        />
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
