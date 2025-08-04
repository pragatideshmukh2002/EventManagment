import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <div className="bg-light">
      {/* Hero Section */}
     <div
  className="position-relative text-white text-center py-5"
  style={{
    minHeight: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    overflow: "hidden",
  }}
>
  {/* Blurred Background Layer */}
  <div
    style={{
      backgroundImage: `url(${process.env.PUBLIC_URL + "/images/aboutus.jpg"})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      filter: "blur(4px)",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1,
    }}
  />

  {/* Foreground Content */}
  <div style={{ position: "relative", zIndex: 2 }}>
    <h1 className="display-4 fw-bold">Welcome to EventHub</h1>
    <p className="lead">Crafting unforgettable moments, one event at a time.</p>
  </div>
</div>

       
      {/* About Section */}
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4">
            <h2>About Us</h2>
            <p>
              At <strong>EventHub</strong>, we specialize in transforming ideas
              into remarkable experiences. Whether it's a romantic wedding, an
              energetic birthday party, or a professional corporate event — we
              ensure perfection in every detail.
            </p>
            <p>
              Backed by creativity and a dedicated team, we manage everything
              from planning to execution — so you can enjoy stress-free
              celebrations.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src={process.env.PUBLIC_URL + "/images/aboutus.jpg"}
              alt="Event Planning"
              className="img-fluid rounded shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white py-5">
        <div className="container text-center">
          <h3 className="mb-5">What We Do Best</h3>
          <div className="row g-4">
            {[
              {
                title: "Weddings",
                icon: "💍",
                desc: "Elegant and memorable wedding experiences.",
              },
              {
                title: "Birthdays",
                icon: "🎉",
                desc: "Fun-filled birthday parties for all ages.",
              },
              {
                title: "Corporate Events",
                icon: "🏢",
                desc: "Professional and seamless business events.",
              },
              {
                title: "Cultural Events",
                icon: "🎭",
                desc: "Showcasing art and heritage with grace.",
              },
            ].map((item, index) => (
              <div className="col-md-3 col-sm-6" key={index}>
                <div className="card border-0 shadow h-100">
                  <div className="card-body text-center">
                    <div style={{ fontSize: "2.5rem" }}>{item.icon}</div>
                    <h5 className="mt-3">{item.title}</h5>
                    <p className="text-muted">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="bg-dark text-white py-5">
        <div className="container text-center">
          <h4 className="mb-4">Contact Us</h4>
          <div className="row">
            <div className="col-md-4 mb-3">
              <h6>Email</h6>
              <p>support@eventhub.com</p>
            </div>
            <div className="col-md-4 mb-3">
              <h6>Phone</h6>
              <p>+91 98765 43210</p>
            </div>
            <div className="col-md-4 mb-3">
              <h6>Address</h6>
              <p>123, Event Street, Pune, Maharashtra, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
