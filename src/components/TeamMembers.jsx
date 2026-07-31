// src/components/TeamMembers.jsx
import React, { useState } from "react";
import Modal from "./Modal";
import "./TeamMembers.css";

const autoReplies = [
  "Sounds good, I'll take a look shortly!",
  "Thanks for the heads up 👍",
  "On it — give me a few minutes.",
  "Got it, talk soon.",
];

const TeamMembers = ({ members, addToast }) => {
  const [chatWith, setChatWith] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");

  const openChat = (member) => {
    setChatWith(member);
    setMessages([
      {
        id: "seed",
        from: "them",
        text: `Hey! This is a demo conversation with ${member.name}.`,
      },
    ]);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const mine = { id: Date.now(), from: "me", text };
    setMessages((prev) => [...prev, mine]);
    setDraft("");
    setTimeout(() => {
      const reply =
        autoReplies[Math.floor(Math.random() * autoReplies.length)];
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "them", text: reply },
      ]);
    }, 900);
  };

  return (
    <div className="team-card">
      <div className="card-header">
        <h3 className="card-title">Team Members</h3>
        <span className="table-hint">{members.length} people</span>
      </div>

      <ul className="team-list">
        {members.map((member) => (
          <li key={member.id} className="team-member">
            <div className="member-info">
              <div className="member-avatar-wrapper">
                <div
                  className="member-avatar"
                  style={{ backgroundColor: member.color }}
                >
                  {member.avatar}
                </div>
                <span
                  className={`status-dot ${
                    member.online ? "online" : "offline"
                  }`}
                />
              </div>
              <div className="member-details">
                <h4 className="member-name">{member.name}</h4>
                <p className="member-role">{member.role}</p>
              </div>
            </div>
            <button
              className="message-button"
              aria-label={`Message ${member.name}`}
              onClick={() => openChat(member)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </li>
        ))}
        {members.length === 0 && (
          <li className="empty-row">No team members yet.</li>
        )}
      </ul>

      {chatWith && (
        <Modal title={`Message ${chatWith.name}`} onClose={() => setChatWith(null)}>
          <div className="chat-messages">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`chat-bubble ${m.from === "me" ? "sent" : "received"}`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <form className="chat-input-row" onSubmit={sendMessage}>
            <input
              className="form-input"
              type="text"
              placeholder="Type a message..."
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button type="submit" className="form-button primary">
              Send
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default TeamMembers;
