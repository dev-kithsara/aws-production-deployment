import React, { useState } from "react";
import API from "../services/api";

export default function AuthPage({ onAuthSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        await API.post("/auth/register", formData);
        alert("Registration successful! Please login.");
        setIsRegister(false);
      } else {
        const res = await API.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        onAuthSuccess(res.data.user);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "4rem auto",
        padding: "2rem",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
      }}
    >
      <h2>{isRegister ? "Create Account" : "Login to CloudTask"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {isRegister && (
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
            }}
          />
        )}
        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #cbd5e1",
          }}
        />
        <input
          type="password"
          placeholder="Password (min 8 chars)"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #cbd5e1",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <p
        style={{
          marginTop: "1rem",
          textAlign: "center",
          cursor: "pointer",
          color: "#2563eb",
        }}
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </p>
    </div>
  );
}
