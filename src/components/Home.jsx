import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/abstract-background-with-colorful-gradient-blobs_23-2149067033.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
      }}
    >
      {/* 🔹 Overlay */}
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(6px)",
          width: "100%",
        }}
      >
        {/* 🔹 Hero Section */}
        <section className="d-flex flex-column flex-md-row align-items-center justify-content-center min-vh-100 px-3">
          <div className="container py-5">
            <div className="row align-items-center text-center text-md-start">
              <div className="col-md-6 mb-4 mb-md-0">
                <h1 className="fw-bold mb-3 display-4 text-dark">
                  Welcome to{" "}
                  <span className="text-primary">Event Management</span>
                </h1>
                <p className="lead text-secondary mb-4 fs-5">
                  Plan, organize, and manage your events effortlessly. From
                  weddings to corporate meetings, we make your event
                  unforgettable.
                </p>
                <div>
                  <a
                    href="/register"
                    className="btn btn-get-started btn-lg px-4 py-2 me-2 mb-2"
                  >
                    🚀 Get Started
                  </a>
                  <a
                    href="/events"
                    className="btn btn-explore-events btn-lg px-4 py-2 mb-2"
                  >
                    🎉 Explore Events
                  </a>
                </div>
              </div>

              <div className="col-md-6 d-flex justify-content-center">
                <img
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
        </section>

        {/* 🔹 About Us Section */}
        <section id="about-us" className="py-5 mt-3 bg-white">
          <div className="container">
            <h2 className="text-center mb-4">ABOUT US</h2>
            <div className="row align-items-center">
              <div className="col-md-6 mb-4 mb-md-0">
                <img
                  src={process.env.PUBLIC_URL + "/images/aboutus.jpg"}
                  alt="About Event"
                  className="img-fluid rounded shadow"
                />
              </div>
              <div className="col-md-6">
                <p className="mb-3">
                  <strong>We are your one-stop destination for flawless events.</strong> 
                  Whether it's a dreamy wedding, a fun-filled birthday, or a formal corporate event, 
                  we manage it all with creativity and precision.
                </p>
                <p className="mb-3">
                  From selecting the venue to the final guest leaving, we handle every detail.
                  Our passionate team works behind the scenes so you can enjoy the spotlight.
                </p>
                <p className="fw-bold">✨ Let’s make your next event unforgettable!</p>
              </div>
            </div>
          </div>
        </section>

        {/* 🔹 CSS Styles */}
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
    </div>
  );
}

export default Home;
