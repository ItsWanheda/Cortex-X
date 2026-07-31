// src/components/StatCard.jsx
import React from "react";
import {
  FiUsers,
  FiDollarSign,
  FiShoppingBag,
  FiTrendingUp,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import "./StatCard.css";

const iconMap = {
  FiUsers,
  FiDollarSign,
  FiShoppingBag,
  FiTrendingUp,
};

const StatCard = ({ title, value, change, trend, icon, color }) => {
  const Icon = iconMap[icon] || FiUsers;
  const TrendIcon = trend === "up" ? FiArrowUp : FiArrowDown;

  return (
    <div className="stat-card">
      <div className="stat-header">
        <div
          className="stat-icon-wrapper"
          style={{
            backgroundColor: `${color}15`,
            color: color,
          }}
        >
          <Icon />
        </div>
        <span className={`stat-change ${trend}`}>
          <TrendIcon />
          {change}
        </span>
      </div>
      <div className="stat-body">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-title">{title}</p>
      </div>
      <div className="stat-chart-placeholder">
        <svg viewBox="0 0 100 30" preserveAspectRatio="none">
          <path
            d="M0,20 Q20,10 40,15 T80,8 T100,12"
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};

export default StatCard;