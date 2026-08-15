import React from "react";

export default function Navbar({ user, onLogout }) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        background: "#1e293b",
        color: "#fff",
        alignItems: "center",
      }}
    >
      <h2 style={{ margin: 0 }}>☁️ CloudTask</h2>
      {user && (
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <span>
            Welcome, <strong>{user.name}</strong>
          </span>
          <button
            onClick={onLogout}
            style={{
              background: "#ef4444",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
