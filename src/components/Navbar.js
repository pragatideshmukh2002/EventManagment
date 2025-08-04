import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{
        background: "linear-gradient(90deg, #000428, #004e92)", // Black + Blue gradient
        padding: "12px 0",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="container">
        {/* ✅ Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/images/eventlogo.png"
            alt="Logo"
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "0 4px 8px rgba(255, 215, 0, 0.5)",
              marginRight: "10px",
              transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.15)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(255, 215, 0, 0.8)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 4px 8px rgba(255, 215, 0, 0.5)";
            }}
          />
          <span
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "white",
              textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
            }}
          >
            Management
          </span>
        </Link>

        {/* ✅ Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ✅ Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-3">
            {["Home", "Events", "Register"].map((item, i) => (
              <li key={i} className="nav-item">
                <Link
                  className="nav-link fw-semibold text-light"
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  style={{
                    fontSize: "17px",
                    transition: "color 0.3s ease-in-out, text-shadow 0.3s ease-in-out",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "#FFD700";
                    e.currentTarget.style.textShadow =
                      "0 0 10px rgba(255,215,0,0.8)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.textShadow = "none";
                  }}
                >
                  {item}
                </Link>
              </li>
            ))}

            <li className="nav-item">
              <Link
                className="btn fw-semibold px-3"
                to="/login"
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#FFD700",
                  color: "#000428",
                  transition: "all 0.3s ease-in-out",
                  fontWeight: "bold",
                  boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.color = "#004e92";
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(255,215,0,0.8)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFD700";
                  e.currentTarget.style.color = "#000428";
                  e.currentTarget.style.boxShadow =
                    "0 3px 6px rgba(0,0,0,0.3)";
                }}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
