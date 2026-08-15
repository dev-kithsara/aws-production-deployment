import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      {user ? (
        <Dashboard />
      ) : (
        <AuthPage onAuthSuccess={(userData) => setUser(userData)} />
      )}
    </div>
  );
}
