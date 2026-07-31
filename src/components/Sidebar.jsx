// src/components/Sidebar.jsx
import React from "react";
import {
  FiHome,
  FiBarChart2,
  FiFolder,
  FiMessageSquare,
  FiCheckSquare,
  FiCalendar,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import "./Sidebar.css";

const menuItems = [
  { icon: FiHome, label: "Dashboard" },
  { icon: FiBarChart2, label: "Analytics" },
  { icon: FiFolder, label: "Projects" },
  { icon: FiMessageSquare, label: "Messages", badge: 5 },
  { icon: FiCheckSquare, label: "Tasks" },
  { icon: FiCalendar, label: "Calendar" },
  { icon: FiSettings, label: "Settings" },
  { icon: FiLogOut, label: "Logout" },
];

const Sidebar = ({ isOpen, onClose, activePage, onNavigate }) => {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <nav className="sidebar-nav">
          <ul className="menu-list">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.label === activePage;
              return (
                <li key={index} className="menu-item-wrapper">
                  <a
                    href="#"
                    className={`menu-item ${isActive ? "active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.label);
                    }}
                  >
                    <Icon className="menu-icon" />
                    <span className="menu-label">{item.label}</span>
                    {item.badge && (
                      <span className="menu-badge">{item.badge}</span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="upgrade-card">
            <div className="upgrade-icon">⭐</div>
            <h4 className="upgrade-title">Upgrade Pro</h4>
            <p className="upgrade-text">
              Get access to all premium features
            </p>
            <button
              className="upgrade-button"
              onClick={() => onNavigate("Settings")}
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
