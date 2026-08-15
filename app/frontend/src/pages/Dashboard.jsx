import React, { useState, useEffect } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDING");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      await API.post("/tasks", { title, description, status });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await API.put(`/tasks/${id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
      <h3>Create New Task</h3>
      <form
        onSubmit={handleCreateTask}
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            flex: "1",
            minWidth: "200px",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #cbd5e1",
          }}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            flex: "1",
            minWidth: "200px",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #cbd5e1",
          }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px" }}
        >
          <option value="PENDING">PENDING</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            background: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Task
        </button>
      </form>

      <h3>Your Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks found. Add your first cloud task!</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                background: "#f8fafc",
              }}
            >
              <div>
                <h4 style={{ margin: "0 0 4px 0" }}>{task.title}</h4>
                <p
                  style={{
                    margin: "0 0 8px 0",
                    color: "#64748b",
                    fontSize: "0.9rem",
                  }}
                >
                  {task.description}
                </p>
                <span
                  style={{
                    fontSize: "0.8rem",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    background:
                      task.status === "COMPLETED"
                        ? "#bbf7d0"
                        : task.status === "IN_PROGRESS"
                          ? "#fef08a"
                          : "#fed7aa",
                  }}
                >
                  {task.status}
                </span>
              </div>
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <select
                  value={task.status}
                  onChange={(e) => handleStatusUpdate(task.id, e.target.value)}
                  style={{ padding: "4px" }}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
                <button
                  onClick={() => handleDelete(task.id)}
                  style={{
                    background: "#ef4444",
                    color: "#fff",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
