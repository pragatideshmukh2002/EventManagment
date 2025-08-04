import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div
      id="home-section"
      className="d-flex flex-column flex-md-row align-items-center justify-content-center vh-100 p-3"
      style={{
        background:
          "url('https://img.freepik.com/free-vector/abstract-background-with-colorful-gradient-blobs_23-2149067033.jpg') no-repeat center center/cover",
        position: "relative",
      }}
    >
      {/* 🔹 Blur Overlay */}
      <div
        id="home-overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(10px)",
        }}
      ></div>

      <div id="home-container" className="container position-relative z-2">
        <div className="row align-items-center text-center text-md-start">
          {/* 🔹 LEFT SIDE CONTENT */}
          <div id="home-left-content" className="col-md-6 mb-4 mb-md-0">
            <h1 id="home-heading" className="fw-bold mb-3 display-4 text-dark">
              Welcome to <span className="text-primary">Event Management</span>
            </h1>
            <p id="home-description" className="lead text-secondary mb-4 fs-5">
              Plan, organize, and manage your events effortlessly. From weddings
              to corporate meetings, we make your event unforgettable.
            </p>
            <div id="home-buttons">
              <a
                id="btn-get-started"
                href="/register"
                className="btn btn-get-started btn-lg px-4 py-2 me-2 mb-2"
              >
                🚀 Get Started
              </a>
              <a
                id="btn-explore-events"
                href="/event"
                className="btn btn-explore-events btn-lg px-4 py-2 mb-2"
              >
                🎉 Explore Events
              </a>
            </div>
          </div>

          {/* 🔹 RIGHT SIDE IMAGE */}
          <div id="home-right-content" className="col-md-6 d-flex justify-content-center">
            <img
              id="home-banner-image"
              src="https://th.bing.com/th/id/R.f72ea92b5496641e46f02082111353ba?rik=1Jfbrj95ATjZmQ&riu=http%3a%2f%2fbrandhights.com%2fwp-content%2fuploads%2f2018%2f09%2fEvent-Management-2.jpg&ehk=cCAab1rH3FoRXuwftICformKo7z6ZijBoHuoiYWuyZY%3d&risl=&pid=ImgRaw&r=0"
              alt="Event Banner"
              className="img-fluid rounded shadow-lg animate-img"
              style={{
                maxWidth: "90%",
                border: "3px solid rgba(255,255,255,0.8)",
              }}
            />
          </div>
        </div>
      </div>

      {/* 🔹 Custom Styling */}
      <style>{`
        .btn-get-started {
          background: linear-gradient(135deg, #4facfe, #00f2fe);
          color: white;
          border: none;
          transition: 0.3s ease-in-out;
          font-weight: bold;
        }
        .btn-get-started:hover {
          transform: scale(1.08);
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
        }

        .btn-explore-events {
          background: white;
          color: #333;
          border: 2px solid #333;
          transition: 0.3s ease-in-out;
          font-weight: bold;
        }
        .btn-explore-events:hover {
          background: #333;
          color: white;
          transform: scale(1.08);
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
        }

        .animate-img {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        /* 🔹 Responsive Fonts */
        @media (max-width: 768px) {
          h1 { font-size: 2rem !important; }
          p { font-size: 1rem !important; }
          .btn-lg { font-size: 1rem !important; padding: 10px 20px !important; }
        }
        @media (max-width: 576px) {
          h1 { font-size: 1.8rem !important; }
          p { font-size: 0.95rem !important; }
          .btn-lg { font-size: 0.9rem !important; padding: 8px 16px !important; }
        }
      `}</style>
    </div>
  );
}

export default Home;
