// src/components/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiBell,
  FiMenu,
  FiFolder,
  FiCheckSquare,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import "./Header.css";

const notifIconMap = {
  comment: FiUser,
  mention: FiUser,
  alert: FiBell,
  info: FiCheckSquare,
};

const Header = ({
  onToggleSidebar,
  projects,
  tasks,
  team,
  notifications,
  setNotifications,
  addToast,
  onNavigate,
}) => {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const userRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const q = query.trim().toLowerCase();
  const matchedProjects = q
    ? projects.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 4)
    : [];
  const matchedTasks = q
    ? tasks.filter((t) => t.title.toLowerCase().includes(q)).slice(0, 4)
    : [];
  const matchedTeam = q
    ? team.filter((m) => m.name.toLowerCase().includes(q)).slice(0, 4)
    : [];
  const hasResults =
    matchedProjects.length || matchedTasks.length || matchedTeam.length;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markNotifRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast("All notifications marked as read", "success");
  };

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="menu-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FiMenu />
        </button>
        <div className="logo">
          <div className="logo-icon">D</div>
          <span className="logo-text">Dashboard</span>
        </div>
      </div>

      <div className="header-search" ref={searchRef}>
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search projects, tasks, people..."
          className="search-input"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSearchOpen(true);
          }}
          onFocus={() => setSearchOpen(true)}
        />
        {searchOpen && q && (
          <div className="search-results">
            {!hasResults && (
              <div className="search-empty">No results for "{query}"</div>
            )}
            {matchedProjects.length > 0 && (
              <div className="search-group">
                <span className="search-group-label">Projects</span>
                {matchedProjects.map((p) => (
                  <div
                    key={`p-${p.id}`}
                    className="search-result-item"
                    onClick={() => {
                      addToast(`Opening project "${p.name}"`, "info");
                      setSearchOpen(false);
                      setQuery("");
                    }}
                  >
                    <FiFolder className="search-result-icon" />
                    <span>{p.name}</span>
                    <span className="search-result-tag">{p.status}</span>
                  </div>
                ))}
              </div>
            )}
            {matchedTasks.length > 0 && (
              <div className="search-group">
                <span className="search-group-label">Tasks</span>
                {matchedTasks.map((t) => (
                  <div
                    key={`t-${t.id}`}
                    className="search-result-item"
                    onClick={() => {
                      addToast(`Opening task "${t.title}"`, "info");
                      setSearchOpen(false);
                      setQuery("");
                    }}
                  >
                    <FiCheckSquare className="search-result-icon" />
                    <span>{t.title}</span>
                  </div>
                ))}
              </div>
            )}
            {matchedTeam.length > 0 && (
              <div className="search-group">
                <span className="search-group-label">People</span>
                {matchedTeam.map((m) => (
                  <div
                    key={`m-${m.id}`}
                    className="search-result-item"
                    onClick={() => {
                      addToast(`Opening ${m.name}'s profile`, "info");
                      setSearchOpen(false);
                      setQuery("");
                    }}
                  >
                    <FiUser className="search-result-icon" />
                    <span>{m.name}</span>
                    <span className="search-result-tag">{m.role}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="header-right">
        <div className="header-dropdown-anchor" ref={notifRef}>
          <button
            className="icon-button"
            aria-label="Notifications"
            onClick={() => setNotifOpen((o) => !o)}
          >
            <FiBell />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>
          {notifOpen && (
            <div className="header-dropdown notif-dropdown">
              <div className="header-dropdown-title-row">
                <span className="header-dropdown-title">Notifications</span>
                {unreadCount > 0 && (
                  <button className="mark-all-read" onClick={markAllRead}>
                    Mark all read
                  </button>
                )}
              </div>
              {notifications.length === 0 && (
                <div className="search-empty">You're all caught up</div>
              )}
              {notifications.map((n) => {
                const Icon = notifIconMap[n.type] || FiBell;
                return (
                  <div
                    key={n.id}
                    className={`header-notif-item ${n.read ? "read" : ""}`}
                    onClick={() => markNotifRead(n.id)}
                  >
                    <span className={`notif-dot ${n.type}`}>
                      <Icon />
                    </span>
                    <div className="header-notif-text">
                      <p>{n.title}</p>
                      <span>{n.time}</span>
                    </div>
                    {!n.read && <span className="unread-dot" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="header-dropdown-anchor" ref={userRef}>
          <div
            className="user-avatar"
            onClick={() => setUserMenuOpen((o) => !o)}
          >
            <span>JD</span>
          </div>
          {userMenuOpen && (
            <div className="header-dropdown user-dropdown">
              <div className="user-dropdown-info">
                <div className="user-avatar small">
                  <span>JD</span>
                </div>
                <div>
                  <p className="user-dropdown-name">John Doe</p>
                  <p className="user-dropdown-email">john@company.com</p>
                </div>
              </div>
              <button
                className="user-dropdown-item"
                onClick={() => {
                  setUserMenuOpen(false);
                  addToast("Profile page is a demo stub", "info");
                }}
              >
                <FiUser /> Profile
              </button>
              <button
                className="user-dropdown-item"
                onClick={() => {
                  setUserMenuOpen(false);
                  onNavigate("Settings");
                }}
              >
                <FiSettings /> Settings
              </button>
              <button
                className="user-dropdown-item danger"
                onClick={() => {
                  setUserMenuOpen(false);
                  onNavigate("Logout");
                }}
              >
                <FiLogOut /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
