// src/components/RightSidebar.jsx
import React, { useState } from "react";
import { FiCalendar, FiBell, FiVideo, FiCheck, FiClock } from "react-icons/fi";
import "./RightSidebar.css";

const notifIconMap = {
  comment: FiBell,
  mention: FiBell,
  alert: FiBell,
  info: FiBell,
};

const RightSidebar = ({ meetings, notifications, setNotifications, addToast }) => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = new Date();
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());
  const [joinedIds, setJoinedIds] = useState([]);

  const currentDay = currentDate.getDate();
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const eventDays = new Set(
    meetings
      .filter(
        (m) =>
          m.dateObj.getMonth() === currentDate.getMonth() &&
          m.dateObj.getFullYear() === currentDate.getFullYear()
      )
      .map((m) => m.dateObj.getDate())
  );

  const visibleMeetings = meetings.filter(
    (m) =>
      m.dateObj.getDate() === selectedDay &&
      m.dateObj.getMonth() === currentDate.getMonth()
  );

  const renderCalendarDays = () => {
    const cells = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-day empty" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === currentDay;
      const isSelected = day === selectedDay;
      const hasEvent = eventDays.has(day);
      cells.push(
        <div
          key={day}
          onClick={() => setSelectedDay(day)}
          className={`calendar-day ${isToday ? "today" : ""} ${
            hasEvent ? "has-event" : ""
          } ${isSelected && !isToday ? "selected" : ""}`}
        >
          {day}
        </div>
      );
    }

    return cells;
  };

  const toggleJoin = (meeting) => {
    setJoinedIds((prev) =>
      prev.includes(meeting.id)
        ? prev.filter((id) => id !== meeting.id)
        : [...prev, meeting.id]
    );
    if (!joinedIds.includes(meeting.id)) {
      addToast && addToast(`Joined "${meeting.title}" (demo)`, "success");
    }
  };

  const markNotifRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAll = () => {
    setNotifications([]);
    addToast && addToast("Notifications cleared", "info");
  };

  return (
    <aside className="right-sidebar">
      <div className="right-card">
        <div className="card-header">
          <h3 className="card-title">
            <FiCalendar /> Calendar
          </h3>
        </div>
        <div className="mini-calendar">
          <div className="calendar-header-info">
            <span className="calendar-month">{monthName}</span>
            <span className="calendar-year">{year}</span>
          </div>
          <div className="calendar-weekdays">
            {days.map((day, idx) => (
              <div key={idx} className="weekday">
                {day}
              </div>
            ))}
          </div>
          <div className="calendar-grid">{renderCalendarDays()}</div>
        </div>
      </div>

      <div className="right-card">
        <div className="card-header">
          <h3 className="card-title">
            <FiClock /> Meetings on {monthName} {selectedDay}
          </h3>
        </div>
        <ul className="meetings-list">
          {visibleMeetings.length === 0 && (
            <li className="no-meetings">No meetings on this day</li>
          )}
          {visibleMeetings.map((meeting) => {
            const joined = joinedIds.includes(meeting.id);
            return (
              <li key={meeting.id} className="meeting-item">
                <div className="meeting-time-block">
                  <span className="meeting-time">{meeting.time}</span>
                  <span className="meeting-date">{meeting.date}</span>
                </div>
                <div className="meeting-info">
                  <h4 className="meeting-title">{meeting.title}</h4>
                  <div className="meeting-participants">
                    {meeting.participants.slice(0, 3).map((p, idx) => (
                      <div
                        key={idx}
                        className="participant-avatar"
                        style={{
                          backgroundColor: ["#4f46e5", "#10b981", "#f59e0b"][
                            idx % 3
                          ],
                        }}
                      >
                        {p}
                      </div>
                    ))}
                    {meeting.participants.length > 3 && (
                      <div className="participant-avatar more">
                        +{meeting.participants.length - 3}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  className={`join-button ${joined ? "joined" : ""}`}
                  aria-label={joined ? "Leave meeting" : "Join meeting"}
                  onClick={() => toggleJoin(meeting)}
                >
                  {joined ? <FiCheck /> : <FiVideo />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="right-card">
        <div className="card-header">
          <h3 className="card-title">
            <FiBell /> Notifications
          </h3>
          {notifications.length > 0 && (
            <span className="notification-count">{notifications.length}</span>
          )}
        </div>
        <ul className="notifications-list">
          {notifications.length === 0 && (
            <li className="no-meetings">You're all caught up</li>
          )}
          {notifications.map((notif) => {
            const Icon = notifIconMap[notif.type] || FiBell;
            return (
              <li
                key={notif.id}
                className={`notification-item ${notif.read ? "read" : ""}`}
                onClick={() => markNotifRead(notif.id)}
              >
                <div className={`notification-icon ${notif.type}`}>
                  <Icon />
                </div>
                <div className="notification-content">
                  <p className="notification-title">{notif.title}</p>
                  <span className="notification-time">{notif.time}</span>
                </div>
              </li>
            );
          })}
        </ul>
        {notifications.length > 0 && (
          <button className="clear-all-button" onClick={clearAll}>
            Clear all
          </button>
        )}
      </div>
    </aside>
  );
};

export default RightSidebar;
