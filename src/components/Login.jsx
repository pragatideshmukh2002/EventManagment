import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Added for redirect
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // ✅ useNavigate

  // ✅ Login handler
  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:7777/api/users/login", login);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // ✅ Save login
      alert(res.data.message);

      const pendingEvent = localStorage.getItem("pendingEventType");
      if (pendingEvent) {
        localStorage.removeItem("pendingEventType");
        navigate(`/event-form/${pendingEvent}`);
      } else {
        navigate("/events"); // 👈 Redirect anywhere you want after login
      }
    } catch (err) {
      alert("Invalid credentials or server error.");
    }
  };

  return (
    <div
      id="login-wrapper"
      className="d-flex justify-content-center align-items-center min-vh-100 px-3 position-relative"
      style={{
        background: "url('/images/loginbackground.jpg') no-repeat center center/cover",
      }}
    >
      {/* ✅ Blur Overlay */}
      <div
        id="login-overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)",
          zIndex: 0,
        }}
      ></div>

      {/* ✅ Card Container */}
      <div
        id="login-card"
        className="row w-100 shadow-lg rounded-4 overflow-hidden bg-white position-relative"
        style={{
          maxWidth: "900px",
          animation: "fadeIn 0.6s ease-in-out",
          zIndex: 1,
        }}
      >
        {/* ✅ Left Side Image + Text */}
        <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center p-4 bg-light">
          <img
            src="/images/loginpage.png"
            alt="Login Illustration"
            className="img-fluid mb-3"
            style={{
              maxWidth: "75%",
              filter: "drop-shadow(0px 6px 15px rgba(0,0,0,0.3))",
              animation: "float 3s ease-in-out infinite",
            }}
          />
          <h1 className="fw-bold text-dark text-center display-5">Welcome!</h1>
          <p className="text-center text-secondary fs-5">
            Book, manage, and plan your events easily. Join us today!
          </p>
        </div>

        {/* ✅ Right Side Login Form */}
        <div className="col-lg-6 d-flex justify-content-center align-items-center p-4">
          <div
            className="p-4 rounded shadow w-100"
            style={{
              maxWidth: "400px",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <h2 className="mb-4 text-center fw-bold text-primary display-6">Login</h2>

            <form onSubmit={handle}>
              {/* Email Field */}
              <div className="mb-3">
                <label htmlFor="login-email" className="form-label fw-semibold fs-5">
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="off"
                  className="form-control form-control-lg custom-input"
                  placeholder="Enter your email"
                  value={login.email}
                  onChange={(e) => setLogin({ ...login, email: e.target.value })}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="mb-3">
                <label htmlFor="login-password" className="form-label fw-semibold fs-5">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  autoComplete="new-password"
                  className="form-control form-control-lg custom-input"
                  placeholder="Enter your password"
                  value={login.password}
                  onChange={(e) => setLogin({ ...login, password: e.target.value })}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                id="btn-login"
                type="submit"
                className="btn w-100 btn-lg fw-bold text-white fs-5"
                style={{
                  background: "linear-gradient(90deg, #6a11cb, #2575fc)",
                  border: "none",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                Login
              </button>
            </form>

            <p className="text-center mt-3 mb-0 fs-6">
              Don't have an account?{" "}
              <a href="/register" className="text-primary fw-semibold text-decoration-none">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .custom-input::placeholder {
          font-size: 1rem;
          color: #888;
        }

        @media (max-width: 992px) {
          #login-card { flex-direction: column; max-width: 95%; }
          h1 { font-size: 2rem !important; }
          h2 { font-size: 1.8rem !important; }
          .fs-5 { font-size: 1rem !important; }
        }
        @media (max-width: 576px) {
          h1 { font-size: 1.6rem !important; }
          h2 { font-size: 1.5rem !important; }
          .fs-5 { font-size: 0.9rem !important; }
          #btn-login { font-size: 1rem !important; }
        }
      `}</style>
    </div>
  );
}
