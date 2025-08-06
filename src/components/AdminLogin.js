// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function AdminLogin() {
//   const [admin, setAdmin] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Manual login validation
//     const hardcodedEmail = "admin";
//     const hardcodedPassword = "admin";

//     try {
//       if (admin.email === hardcodedEmail && admin.password === hardcodedPassword) {
//         // Simulate a token and store it
//         localStorage.setItem("adminToken", "manual-admin-token");
//         localStorage.setItem("adminEmail", admin.email);

//         navigate("/admin/dashboard"); // Redirect to dashboard
//       } else {
//         alert("❌ Invalid admin credentials. Please try again.");
//       }
//     } catch (err) {
//       alert("Unexpected error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: "400px" }}>
//       <h3 className="text-center mb-4">Admin Login</h3>
//       <form onSubmit={handleLogin}>
//         <div className="mb-3">
//           <label>Email</label>
//           <input
//             type="text"
//             className="form-control"
//             value={admin.email}
//             onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
//             required
//             disabled={loading}
//             placeholder="Enter admin username"
//           />
//         </div>

//         <div className="mb-3">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             value={admin.password}
//             onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
//             required
//             disabled={loading}
//             placeholder="Enter password"
//           />
//         </div>

//         <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//           {loading ? "Logging in..." : "Login as Admin"}
//         </button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminLogin() {
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const hardcodedEmail = "admin";
    const hardcodedPassword = "admin";

    try {
      if (admin.email === hardcodedEmail && admin.password === hardcodedPassword) {
        // ✅ Simulate token for admin
        localStorage.setItem("adminToken", "manual-admin-token");
        localStorage.setItem("adminEmail", admin.email);
        navigate("/admin/dashboard");
      } else {
        alert("❌ Invalid admin credentials. Please try again.");
      }
    } catch (err) {
      alert("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Admin Login</h3>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
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
          <label>Password</label>
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

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Logging in..." : "Login as Admin"}
        </button>
      </form>
    </div>
  );
}
