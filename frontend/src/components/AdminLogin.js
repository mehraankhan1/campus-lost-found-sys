// frontend/src/components/AdminLogin.js
import React, { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const DEMO_EMAIL =
    process.env.REACT_APP_DEMO_ADMIN_EMAIL || "admin@qut.edu.au";
  const DEMO_PASS = process.env.REACT_APP_DEMO_ADMIN_PASS || "admin123";

  const submit = (e) => {
    e.preventDefault();
    if (email === DEMO_EMAIL && pass === DEMO_PASS) {
      localStorage.setItem("demo_admin_email", email);
      localStorage.setItem("demo_admin_pass", pass);
      localStorage.setItem("role", "admin"); // simple role flag for UI
      setErr("");
      onLogin && onLogin({ email, role: "admin" });
    } else {
      setErr("Invalid demo credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem("demo_admin_email");
    localStorage.removeItem("demo_admin_pass");
    localStorage.removeItem("role");
    onLogin && onLogin(null);
  };

  // show logout button if already logged in
  if (localStorage.getItem("role") === "admin") {
    return (
      <div className="admin-banner">
        <div>
          Logged in as demo admin ({localStorage.getItem("demo_admin_email")})
        </div>
        <button className="btn btn-secondary" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <form className="admin-login-card" onSubmit={submit}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          placeholder="admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "8px 10px", borderRadius: 8 }}
        />
        <input
          placeholder="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          style={{ padding: "8px 10px", borderRadius: 8 }}
        />
        <button type="submit" className="btn btn-primary">
          Admin Login
        </button>
      </div>
      {err && <div style={{ color: "crimson", marginTop: 8 }}>{err}</div>}
      <div style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>
        Demo admin: admin@qut.edu.au / admin123
      </div>
    </form>
  );
}
