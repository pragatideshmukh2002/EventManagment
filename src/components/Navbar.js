// src/components/Navbar.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const gradientStyle = {
    background: "linear-gradient(90deg, #000000, #0d47a1, #000000)",
    backgroundSize: "400% 400%",
    animation: "gradientBG 15s ease infinite",
    zIndex: "1050",
  };

  const styleSheet = `
    @keyframes gradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .nav-link {
      color: white !important;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .nav-link:hover {
      color: #FFD700 !important;
      text-shadow: 0 0 10px rgba(255, 215, 0, 0.9);
    }

    .navbar-toggler-icon {
      filter: invert(1);
    }

    body {
      padding-top: 80px;
    }

    .nav-profile {
      color: #FFD700 !important;
      font-weight: bold;
      text-transform: capitalize;
    }
  `;

  return (
    <>
      <style>{styleSheet}</style>
      <nav className="navbar navbar-expand-lg fixed-top shadow" style={gradientStyle}>
        <div className="container-fluid px-4">
          <Link className="navbar-brand text-white fw-bold fs-3" to="/">
            Event<span className="text-primary">Management</span>
          </Link>
          <button
            className="navbar-toggler bg-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-3 align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/events">Events</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li> */}

              {user ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link nav-profile">
                      {user.email?.split("@")[0]}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-sm btn-outline-light"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
