import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../context/AuthContext";

export default function AdminLogin() {
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const hardcodedEmail = "admin";
    const hardcodedPassword = "admin";

    try {
      if (admin.email === hardcodedEmail && admin.password === hardcodedPassword) {
        const userData = { email: admin.email, role: "admin" };
        localStorage.setItem("adminToken", "manual-admin-token");
        localStorage.setItem("adminEmail", admin.email);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        navigate("/admin/dashboard");
      } else {
        alert("❌ Invalid admin credentials.");
      }
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-4 fw-bold text-primary">Admin Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={admin.email}
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
              required
              disabled={loading}
              placeholder="Enter admin username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={admin.password}
              onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
              required
              disabled={loading}
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
