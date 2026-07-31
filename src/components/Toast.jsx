// src/components/Toast.jsx
import React, { useEffect } from "react";
import "./Toast.css";

const icons = {
  success: "✓",
  info: "ℹ",
  warning: "⚠",
  error: "!",
};

const Toast = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icon = icons[toast.type] || icons.info;

  return (
    <div className={`toast toast-${toast.type}`}>
      <span className="toast-icon">{icon}</span>

      <span className="toast-message">
        {toast.message}
      </span>

      <button
        className="toast-close"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
};

export const ToastContainer = ({ toasts, onDismiss }) => {
  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
};

export default Toast;