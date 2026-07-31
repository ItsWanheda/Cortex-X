// src/components/Activity.jsx
import React from "react";
import "./Activity.css";

const Activity = ({ activities, addToast }) => {
  return (
    <div className="activity-card">
      <div className="card-header">
        <h3 className="card-title">Recent Activity</h3>
        <button
          className="view-all-button"
          onClick={() =>
            addToast && addToast("Full activity log is a demo stub", "info")
          }
        >
          View All
        </button>
      </div>

      <div className="timeline">
        {activities.map((activity, index) => (
          <div key={activity.id} className="timeline-item">
            <div className="timeline-line">
              <div
                className="timeline-dot"
                style={{ backgroundColor: activity.color }}
              >
                {activity.avatar}
              </div>
              {index !== activities.length - 1 && (
                <div className="timeline-connector" />
              )}
            </div>
            <div className="timeline-content">
              <p className="timeline-text">
                <strong>{activity.user}</strong> {activity.action}{" "}
                <span className="timeline-target">{activity.target}</span>
              </p>
              <span className="timeline-time">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;