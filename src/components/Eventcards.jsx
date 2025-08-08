// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "bootstrap/dist/css/bootstrap.min.css";

// const events = [
//   {
//     id: "event-marriage",
//     title: "Marriages",
//     img: process.env.PUBLIC_URL + "/images/flowers.jpg",
//     desc: "Plan your dream wedding with us – from venue to décor.",
//     type: "marriage",
//   },
//   {
//     id: "event-birthday",
//     title: "Birthdays",
//     img: process.env.PUBLIC_URL + "/images/birthdayparty.jpg",
//     desc: "Celebrate your special day with fun and style.",
//     type: "birthday",
//   },
//   {
//     id: "event-corporate",
//     title: "Corporate Events",
//     img: process.env.PUBLIC_URL + "/images/CorporateEvents.jpg",
//     desc: "Host conferences, seminars, and business meet-ups.",
//     type: "corporate",
//   },
//   {
//     id: "event-cultural",
//     title: "Cultural Events",
//     img: process.env.PUBLIC_URL + "/images/CulturalEvents.jpg",
//     desc: "Organize cultural programs, concerts, and festivals.",
//     type: "cultural",
//   },
// ];

// export default function EventCards() {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const handleCardClick = (type) => {
//     if (!user) {
//       localStorage.setItem("pendingEventType", type);
//       navigate("/login");
//     } else {
//       navigate(`/event-form/${type}`);
//     }
//   };

//   return (
//     <div id="eventcards-container" className="container py-5">
//       {/* ✅ Animated Gradient Heading */}
//       <h1
//         id="eventcards-heading"
//         className="text-center mb-5 fw-bold display-5 animated-gradient-text"
//       // 🔹 This line adds space from top
//       >
//         Choose Your Event
//       </h1>
//       <div id="eventcards-row" className="row g-4 justify-content-center">
//         {events.map((event) => (
//           <div key={event.id} id={`eventcard-col-${event.id}`} className="col-md-6 col-lg-6">
//             <div
//               id={`eventcard-${event.id}`}
//               className="event-card card shadow-lg border-0 rounded-4 h-100 text-center"
//               onClick={() => handleCardClick(event.type)}
//             >
//               <div id={`eventcard-img-container-${event.id}`} className="card-img-container">
//                 <img
//                   id={`eventcard-img-${event.id}`}
//                   src={event.img}
//                   alt={event.title}
//                   className="card-img-top"
//                   onError={(e) =>
//                     (e.target.src = process.env.PUBLIC_URL + "/images/fallback.jpg")
//                   }
//                 />
//               </div>
//               <div id={`eventcard-body-${event.id}`} className="card-body p-4">
//                 <h4 id={`eventcard-title-${event.id}`} className="card-title fw-bold mb-2">
//                   {event.title}
//                 </h4>
//                 <p id={`eventcard-text-${event.id}`} className="card-text text-muted mb-3">
//                   {event.desc}
//                 </p>
//                 <button
//                   id={`eventcard-btn-${event.id}`}
//                   className="btn btn-gradient px-4 py-2 fw-semibold"
//                 >
//                   Book Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <style>{`
//         /* 🔹 Card Hover & Style */
//         .event-card {
//           cursor: pointer;
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//           border-radius: 15px;
//           overflow: hidden;
//         }
//         .event-card:hover {
//           transform: translateY(-8px) scale(1.02);
//           box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
//         }
//         .card-img-container {
//           overflow: hidden;
//           height: 250px;
//         }
//         .card-img-top {
//           height: 100%;
//           width: 100%;
//           object-fit: cover;
//           transition: transform 0.5s ease;
//         }
//         .event-card:hover .card-img-top {
//           transform: scale(1.1);
//         }

//         /* 🔹 Gradient Button */
//         .btn-gradient {
//           background: linear-gradient(135deg, #324476ff, #0090feff);
//           border: none;
//           color: white;
//           transition: 0.3s ease-in-out;
//           border-radius: 30px;
//         }
//         .btn-gradient:hover {
//           transform: scale(1.05);
//           box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
//         }

//         /* 🔹 Animated Gradient Heading */
//         .animated-gradient-text {
//           background: linear-gradient(270deg, #324476, #0090fe, #4facfe, #0090fe);
//           background-size: 600% 600%;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           animation: gradientMove 4s ease infinite;
//         }

//         @keyframes gradientMove {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }

//         /* 🔹 Font Sizes */
//         .card-title { font-size: 1.5rem; }
//         .card-text { font-size: 1rem; }

//         @media (max-width: 1200px) {
//           .card-title { font-size: 1.4rem; }
//           .card-text { font-size: 0.95rem; }
//         }
//         @media (max-width: 992px) {
//           .card-title { font-size: 1.3rem; }
//           .card-text { font-size: 0.9rem; }
//           .card-img-container { height: 220px; }
//         }
//         @media (max-width: 768px) {
//           .card-title { font-size: 1.2rem; }
//           .card-text { font-size: 0.9rem; }
//           .card-img-container { height: 200px; }
//         }
//         @media (max-width: 576px) {
//           .card-title { font-size: 1.1rem; }
//           .card-text { font-size: 0.85rem; }
//           .card-img-container { height: 180px; }
//           .btn-gradient { font-size: 0.9rem; padding: 8px 18px; }
//         }
//       `}</style>
//     </div>
//   );
// }
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../context/UserAuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const events = [
  {
    id: "event-marriage",
    title: "Marriages",
    img: process.env.PUBLIC_URL + "/images/flowers.jpg",
    desc: "Plan your dream wedding with us – from venue to décor.",
    type: "marriage",
  },
  {
    id: "event-birthday",
    title: "Birthdays",
    img: process.env.PUBLIC_URL + "/images/birthdayparty.jpg",
    desc: "Celebrate your special day with fun and style.",
    type: "birthday",
  },
  {
    id: "event-corporate",
    title: "Corporate Events",
    img: process.env.PUBLIC_URL + "/images/CorporateEvents.jpg",
    desc: "Host conferences, seminars, and business meet-ups.",
    type: "corporate",
  },
  {
    id: "event-cultural",
    title: "Cultural Events",
    img: process.env.PUBLIC_URL + "/images/CulturalEvents.jpg",
    desc: "Organize cultural programs, concerts, and festivals.",
    type: "cultural",
  },
];

// Styles
const styles = {
  container: {
    paddingTop: "4rem",
    paddingBottom: "4rem",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  heading: {
    fontWeight: "900",
    fontSize: "3rem",
    textAlign: "center",
    marginBottom: "3rem",
    background: "linear-gradient(90deg, #6a11cb, #2575fc, #6a11cb)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "gradientShift 8s ease infinite",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    justifyContent: "center",
  },
  cardWrapper: {
    flex: "1 1 45%",
    maxWidth: "45%",
    minWidth: "300px",
    cursor: "pointer",
    borderRadius: "1rem",
    boxShadow: "0 8px 20px rgba(37, 117, 252, 0.3)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  cardWrapperHover: {
    transform: "scale(1.05)",
    boxShadow: "0 12px 30px rgba(37, 117, 252, 0.6)",
  },
  imgContainer: {
    height: "220px",
    overflow: "hidden",
    borderTopLeftRadius: "1rem",
    borderTopRightRadius: "1rem",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
  },
  cardBody: {
    padding: "1.5rem 1.8rem",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontWeight: "700",
    fontSize: "1.5rem",
    marginBottom: "0.75rem",
    color: "#222",
  },
  desc: {
    flexGrow: 1,
    color: "#555",
    fontSize: "1rem",
    lineHeight: "1.4",
    marginBottom: "1.5rem",
  },
  button: {
    background:
      "linear-gradient(90deg, #6a11cb 0%, #2575fc 50%, #6a11cb 100%)",
    border: "none",
    padding: "0.6rem 1.8rem",
    fontSize: "1rem",
    fontWeight: "600",
    color: "white",
    borderRadius: "50px",
    alignSelf: "center",
    boxShadow: "0 4px 15px rgba(37, 117, 252, 0.5)",
    transition: "background 0.4s ease, box-shadow 0.4s ease",
  },
  buttonHover: {
    background:
      "linear-gradient(90deg, #2575fc 0%, #6a11cb 50%, #2575fc 100%)",
    boxShadow: "0 6px 20px rgba(37, 117, 252, 0.8)",
  },
  '@keyframes gradientShift': {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" },
  },
};

export default function EventCards() {
  const navigate = useNavigate();
  const { user } = useContext(UserAuthContext);

  const [hoveredCard, setHoveredCard] = React.useState(null);
  const [btnHover, setBtnHover] = React.useState(null);

  const handleCardClick = (event) => {
    if (!user) {
      localStorage.setItem("pendingEventType", event.type);
      navigate("/login", { state: { from: { pathname: "/event-form/" + event.type } } });
    } else {
      navigate(`/event-form/${event.type}`, { state: { title: event.title } });
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading} className="animated-gradient-text">
        Choose Your Event
      </h1>
      <div style={styles.row}>
        {events.map((event) => (
          <div
            key={event.id}
            style={{
              ...styles.cardWrapper,
              ...(hoveredCard === event.id ? styles.cardWrapperHover : {}),
            }}
            onMouseEnter={() => setHoveredCard(event.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleCardClick(event)}
          >
            <div style={styles.imgContainer}>
              <img
                src={event.img}
                alt={event.title}
                style={{
                  ...styles.img,
                  ...(hoveredCard === event.id
                    ? { transform: "scale(1.1)" }
                    : { transform: "scale(1)" }),
                }}
                onError={(e) =>
                  (e.target.src = process.env.PUBLIC_URL + "/images/fallback.jpg")
                }
              />
            </div>
            <div style={styles.cardBody}>
              <h4 style={styles.title}>{event.title}</h4>
              <p style={styles.desc}>{event.desc}</p>
              <button
                style={{
                  ...styles.button,
                  ...(btnHover === event.id ? styles.buttonHover : {}),
                }}
                onMouseEnter={() => setBtnHover(event.id)}
                onMouseLeave={() => setBtnHover(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(event);
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
