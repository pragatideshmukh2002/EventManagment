import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("adminEmail");
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
    } else {
      setAdminEmail(email);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    navigate("/admin/login");
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">🛠️ Admin Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="mb-4">
        <h5>Welcome, <span className="text-primary">{adminEmail}</span></h5>
        <p className="text-muted">Here's an overview of your event platform activities.</p>
      </div>

      {/* Dashboard Summary Cards */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-4">
            <h5>Total Events</h5>
            <p className="display-6 fw-bold text-success">128</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-4">
            <h5>Users Registered</h5>
            <p className="display-6 fw-bold text-info">54</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-4">
            <h5>Revenue Generated</h5>
            <p className="display-6 fw-bold text-warning">₹3.4L</p>
          </div>
        </div>
      </div>

      {/* Table Preview (Example) */}
      <div className="mt-5">
        <h4 className="mb-3">📋 Recent Event Bookings</h4>
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Event Date</th>
                <th>Package</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Amit Verma</td>
                <td>2025-08-10</td>
                <td>Gold</td>
                <td>₹1,75,000</td>
                <td><span className="badge bg-success">Confirmed</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Riya Shah</td>
                <td>2025-08-12</td>
                <td>Silver</td>
                <td>₹1,20,000</td>
                <td><span className="badge bg-warning text-dark">Pending</span></td>
              </tr>
              <tr>
                <td>3</td>
                <td>Manoj Patil</td>
                <td>2025-08-15</td>
                <td>Platinum</td>
                <td>₹2,50,000</td>
                <td><span className="badge bg-danger">Cancelled</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
