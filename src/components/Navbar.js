
// // src/components/Navbar.js
// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext"; // Admin context
// import { UserAuthContext } from "../context/UserAuthContext"; // User context
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import { useEffect } from "react";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const { admin, logout: adminLogout } = useContext(AuthContext); // admin
//   const { user, logout: userLogout } = useContext(UserAuthContext); // user

//   const handleLogout = () => {
//     if (admin) {
//       adminLogout();
//       navigate("/adminlogin");
//     } else if (user) {
//       userLogout();
//       navigate("/login");
//     }
//   };

// useEffect(() => {
//   console.log("Admin state:", admin);
//   console.log("User state:", user);
// }, [admin, user]);

//   const gradientStyle = {
//     background: "linear-gradient(90deg, #000000, #0d47a1, #000000)",
//     backgroundSize: "400% 400%",
//     animation: "gradientBG 15s ease infinite",
//     zIndex: "1050",
//   };

//   const styleSheet = `
//     @keyframes gradientBG {
//       0% { background-position: 0% 50%; }
//       50% { background-position: 100% 50%; }
//       100% { background-position: 0% 50%; }
//     }

//     .nav-link {
//       color: white !important;
//       font-weight: 500;
//       transition: all 0.3s ease;
//     }

//     .nav-link:hover {
//       color: #FFD700 !important;
//       text-shadow: 0 0 10px rgba(255, 215, 0, 0.9);
//     }

//     .navbar-toggler-icon {
//       filter: invert(1);
//     }

//     body {
//       padding-top: 80px;
//     }

//     .nav-profile {
//       color: #FFD700 !important;
//       font-weight: bold;
//       text-transform: capitalize;
//     }
//   `;

//   return (
//     <>
//       <style>{styleSheet}</style>
//       <nav className="navbar navbar-expand-lg fixed-top shadow" style={gradientStyle}>
//         <div className="container-fluid px-4">
//           <Link className="navbar-brand text-white fw-bold fs-3" to="/">
//             Event<span className="text-primary">Management</span>
//           </Link>

//           <button
//             className="navbar-toggler bg-white"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto gap-3 align-items-center">
//               <li className="nav-item">
//                 <Link className="nav-link" to="/">Home</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/about">About Us</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/events">Events</Link>
//               </li>

//               {admin ? (
//                 <>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/dashboard">📊 Dashboard</Link>
//                   </li>
//                   <li className="nav-item">
//                     <span className="nav-link nav-profile">Admin</span>
//                   </li>
//                   <li className="nav-item">
//                     <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
//                       Logout
//                     </button>
//                   </li>
//                 </>
//               ) : user ? (
//                 <>
//                   <li className="nav-item">
//                     <span className="nav-link nav-profile">
//                       {user.email?.split("@")[0]}
//                     </span>
//                   </li>
//                   <li className="nav-item">
//                     <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
//                       Logout
//                     </button>
//                   </li>
//                 </>
//               ) : (
//                 <li className="nav-item dropdown">
//                   <a
//                     className="nav-link dropdown-toggle"
//                     href="#"
//                     id="loginDropdown"
//                     role="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   >
//                     Login
//                   </a>
//                   <ul className="dropdown-menu" aria-labelledby="loginDropdown">
//                     <li>
//                       <Link className="dropdown-item" to="/login">
//                         User Login
//                       </Link>
//                     </li>
//                     <li>
//                       <Link className="dropdown-item" to="/adminlogin">
//                         Admin Login
//                       </Link>
//                     </li>
//                   </ul>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }
// src/components/Navbar.js
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Admin context
import { UserAuthContext } from "../context/UserAuthContext"; // User context
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Navbar() {
  const navigate = useNavigate();
  const { admin, logout: adminLogout } = useContext(AuthContext);
  const { user, logout: userLogout } = useContext(UserAuthContext);

  const handleLogout = () => {
    if (admin) {
      adminLogout();
      navigate("/adminlogin");
    } else if (user) {
      userLogout();
      navigate("/login");
    }
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

              {/* Admin UI */}
              {admin ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">📊 Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link nav-profile">Admin</span>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ): user ? (
                // User UI
                <>
                  <li className="nav-item">
                    <span className="nav-link nav-profile">
                      {user.email?.split("@")[0]}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                // No user logged in
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="loginDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Login
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="loginDropdown">
                    <li>
                      <Link className="dropdown-item" to="/login">
                        User Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/adminlogin">
                        Admin Login
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
