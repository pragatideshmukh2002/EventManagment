  // import React, { useState } from "react";
  // import axios from "axios";
  // import { Link } from "react-router-dom";

  // export default function Register() {
  //   const [formData, setFormData] = useState({
  //     firstName: "",
  //     lastName: "",
  //     contactNumber: "",
  //     email: "",
  //     address: "",
  //     password: "",
  //   });

  //   const [errors, setErrors] = useState({});

  //   const validate = () => {
  //     let newErrors = {};
  //     if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
  //     if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
  //     if (!/^[0-9]{10}$/.test(formData.contactNumber))
  //       newErrors.contactNumber = "Enter a valid 10-digit number";
  //     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
  //       newErrors.email = "Enter a valid email";
  //     if (!formData.address.trim()) newErrors.address = "Address is required";
  //     if (formData.password.length < 6)
  //       newErrors.password = "Password must be at least 6 characters";

  //     setErrors(newErrors);
  //     return Object.keys(newErrors).length === 0;
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     if (!validate()) return;

  //     try {
  //       await axios.post("http://localhost:7777/api/users/register", formData);
  //       alert("✅ Registered Successfully!");
  //     } catch {
  //       alert("❌ Registration Failed");
  //     }
  //   };

  //   return (
  //   <div
  //   id="register-wrapper"
  //   className="container-fluid py-4 position-relative"
  //   style={{
  //     backgroundImage: `url(${process.env.PUBLIC_URL + '/images/registrationbackground.jpg'})`,
  //     backgroundRepeat: "no-repeat",
  //     backgroundPosition: "center",
  //     backgroundSize: "cover",
  //     minHeight: "100vh",
  //   }}
  // >

      
  //       {/* ✅ Blur Overlay */}
  //       <div
  //         style={{
  //           position: "absolute",
  //           top: 0,
  //           left: 0,
  //           right: 0,
  //           bottom: 0,
  //           backgroundColor: "rgba(10, 9, 9, 0.4)",
  //           backdropFilter: "blur(8px)",
  //           zIndex: 0,
  //         }}
  //       ></div>

  //       {/* ✅ Existing Content */}
  //       <div className="row justify-content-center position-relative" style={{ zIndex: 1 }}>
  //         <div className="col-lg-10 col-md-11 col-12 shadow-lg rounded-4 overflow-hidden bg-white p-0">
  //           <div className="row g-0 flex-column flex-md-row">
              
  //             {/* ✅ Image Section */}
  //             <div
  //               id="register-left"
  //               className="col-md-6 d-flex flex-column align-items-center justify-content-center bg-light p-3"
  //             >
  //               <img
  //                 id="register-image"
  //                 src="/images/registration.png"
  //                 alt="Register"
  //                 className="img-fluid mb-3"
  //                 style={{
  //                   maxWidth: "80%",
  //                   filter: "drop-shadow(0px 6px 15px rgba(0, 0, 0, 0.3))",
  //                   animation: "float 3s ease-in-out infinite",
  //                 }}
  //               />
  //               <p
  //                 id="register-caption"
  //                 className="text-center fw-bold px-3"
  //                 style={{ fontSize: "18px" }}
  //               >
  //                 Join our Event Platform & manage bookings hassle-free!
  //               </p>
  //             </div>

  //             {/* ✅ Form Section */}
  //             <div id="register-right" className="col-md-6 col-12 p-4">
  //               <div className="p-3 p-md-4">
  //                 <h2
  //                   id="register-title"
  //                   className="text-center fw-bold text-primary mb-3"
  //                 >
  //                   Create Your Account
  //                 </h2>

  //                 <form id="register-form" onSubmit={handleSubmit}>
  //                   {/* First Name */}
  //                   <div className="mb-3">
  //                     <input
  //                       id="input-firstName"
  //                       type="text"
  //                       className={`form-control rounded-3 ${errors.firstName ? "is-invalid" : ""}`}
  //                       placeholder="First Name"
  //                       value={formData.firstName}
  //                       onChange={(e) =>
  //                         setFormData({ ...formData, firstName: e.target.value })
  //                       }
  //                     />
  //                     {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
  //                   </div>

  //                   {/* Last Name */}
  //                   <div className="mb-3">
  //                     <input
  //                       id="input-lastName"
  //                       type="text"
  //                       className={`form-control rounded-3 ${errors.lastName ? "is-invalid" : ""}`}
  //                       placeholder="Last Name"
  //                       value={formData.lastName}
  //                       onChange={(e) =>
  //                         setFormData({ ...formData, lastName: e.target.value })
  //                       }
  //                     />
  //                     {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
  //                   </div>

  //                   {/* Contact Number */}
  //                   <div className="mb-3">
  //                     <input
  //                       id="input-contactNumber"
  //                       type="text"
  //                       className={`form-control rounded-3 ${errors.contactNumber ? "is-invalid" : ""}`}
  //                       placeholder="Contact Number"
  //                       value={formData.contactNumber}
  //                       onChange={(e) =>
  //                         setFormData({ ...formData, contactNumber: e.target.value })
  //                       }
  //                     />
  //                     {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
  //                   </div>

  //                   {/* Email */}
  //                   <div className="mb-3">
  //                     <input
  //                       id="input-email"
  //                       type="email"
  //                       className={`form-control rounded-3 ${errors.email ? "is-invalid" : ""}`}
  //                       placeholder="Email"
  //                       value={formData.email}
  //                       onChange={(e) =>
  //                         setFormData({ ...formData, email: e.target.value })
  //                       }
  //                     />
  //                     {errors.email && <div className="invalid-feedback">{errors.email}</div>}
  //                   </div>

  //                   {/* Address */}
  //                   <div className="mb-3">
  //                     <textarea
  //                       id="input-address"
  //                       className={`form-control rounded-3 ${errors.address ? "is-invalid" : ""}`}
  //                       placeholder="Address"
  //                       rows="2"
  //                       value={formData.address}
  //                       onChange={(e) =>
  //                         setFormData({ ...formData, address: e.target.value })
  //                       }
  //                     ></textarea>
  //                     {errors.address && <div className="invalid-feedback">{errors.address}</div>}
  //                   </div>

  //                   {/* Password */}
  //                   <div className="mb-3">
  //                     <input
  //                       id="input-password"
  //                       type="password"
  //                       className={`form-control rounded-3 ${errors.password ? "is-invalid" : ""}`}
  //                       placeholder="Password"
  //                       value={formData.password}
  //                       onChange={(e) =>
  //                         setFormData({ ...formData, password: e.target.value })
  //                       }
  //                     />
  //                     {errors.password && <div className="invalid-feedback">{errors.password}</div>}
  //                   </div>

  //                   {/* Submit Button */}
  //                   <div className="text-center">
  //                     <button
  //                       id="btn-submit"
  //                       type="submit"
  //                       className="btn text-white fw-bold px-5 py-2"
  //                       style={{
  //                         background: "linear-gradient(135deg, #4facfe, #00f2fe)",
  //                         borderRadius: "30px",
  //                         fontSize: "18px",
  //                         transition: "0.3s ease-in-out",
  //                       }}
  //                       onMouseOver={(e) =>
  //                         (e.target.style.background = "linear-gradient(135deg, #00f2fe, #4facfe)")
  //                       }
  //                       onMouseOut={(e) =>
  //                         (e.target.style.background = "linear-gradient(135deg, #4facfe, #00f2fe)")
  //                       }
  //                     >
  //                       Submit
  //                     </button>
  //                   </div>

  //                   <div id="login-link" className="text-center mt-3">
  //                     <p className="mb-0">
  //                       Already have an account?{" "}
  //                       <Link to="/login" className="fw-bold text-primary">
  //                         Login
  //                       </Link>
  //                     </p>
  //                   </div>
  //                 </form>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       <style>{`
  //         @keyframes float {
  //           0% { transform: translateY(0px); }
  //           50% { transform: translateY(-10px); }
  //           100% { transform: translateY(0px); }
  //         }
  //         @media (max-width: 768px) {
  //           #register-wrapper { padding: 10px; }
  //           #register-image { max-width: 60%; }
  //           #register-title { font-size: 1.6rem; }
  //           #btn-submit { width: 100%; font-size: 1rem; }
  //         }
  //       `}</style>
  //     </div>
  //   );
  // }



  import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    address: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!/^[0-9]{10}$/.test(formData.contactNumber))
      newErrors.contactNumber = "Enter a valid 10-digit number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("http://localhost:7777/api/users/register", formData);
      alert("✅ Registered Successfully!");
    } catch {
      alert("❌ Registration Failed");
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center position-relative"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/images/registrationbackground.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {/* ✅ Blur Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(6px)",
          zIndex: 0,
        }}
      ></div>

      {/* ✅ Card */}
      <div
        className="shadow-lg rounded-4 bg-white overflow-hidden position-relative register-card"
        style={{ zIndex: 1 }}
      >
        {/* ✅ Left Image Section */}
        <div className="register-left d-flex flex-column align-items-center justify-content-center p-3 bg-light">
          <img
            src="/images/registration.png"
            alt="Register"
            style={{
              maxWidth: "75%",
              filter: "drop-shadow(0px 6px 15px rgba(0, 0, 0, 0.3))",
              animation: "float 3s ease-in-out infinite",
            }}
          />
          <p className="text-center fw-bold mt-3 px-3" style={{ fontSize: "16px" }}>
            Join our Event Platform & manage bookings hassle-free!
          </p>
        </div>

        {/* ✅ Right Form Section */}
        <div className="register-right p-4">
          <h2
            className="text-center fw-bold mb-3"
            style={{
              background: "linear-gradient(135deg, #4facfe, #00f2fe)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit}>
            {[
              { id: "firstName", type: "text", placeholder: "First Name" },
              { id: "lastName", type: "text", placeholder: "Last Name" },
              { id: "contactNumber", type: "text", placeholder: "Contact Number" },
              { id: "email", type: "email", placeholder: "Email" },
            ].map((field) => (
              <div className="mb-2" key={field.id}>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.id]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.id]: e.target.value })
                  }
                  className={`form-control rounded-3 ${errors[field.id] ? "is-invalid" : ""}`}
                  style={{ padding: "10px", fontSize: "15px" }}
                />
                {errors[field.id] && (
                  <div className="invalid-feedback">{errors[field.id]}</div>
                )}
              </div>
            ))}

            {/* Address */}
            <div className="mb-2">
              <textarea
                placeholder="Address"
                rows="2"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className={`form-control rounded-3 ${errors.address ? "is-invalid" : ""}`}
                style={{ padding: "10px", fontSize: "15px" }}
              ></textarea>
              {errors.address && <div className="invalid-feedback">{errors.address}</div>}
            </div>

            {/* Password */}
            <div className="mb-2">
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`form-control rounded-3 ${errors.password ? "is-invalid" : ""}`}
                style={{ padding: "10px", fontSize: "15px" }}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            {/* Submit Button */}
            <div className="text-center mt-3">
              <button
                type="submit"
                className="btn text-white fw-bold px-5 py-2"
                style={{
                  background: "linear-gradient(135deg, #4facfe, #00f2fe)",
                  borderRadius: "30px",
                  fontSize: "16px",
                  transition: "0.3s ease-in-out",
                }}
                onMouseOver={(e) =>
                  (e.target.style.background =
                    "linear-gradient(135deg, #00f2fe, #4facfe)")
                }
                onMouseOut={(e) =>
                  (e.target.style.background =
                    "linear-gradient(135deg, #4facfe, #00f2fe)")
                }
              >
                Submit
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-3">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="fw-bold text-primary">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        /* Card Base */
        .register-card {
          display: flex;
          flex-direction: row;
          max-width: 900px;
          width: 90%;
        }

        .register-left {
          flex: 0.4;
          min-height: 400px;
        }

        .register-right {
          flex: 0.6;
        }

        /* ✅ Responsive */
        @media (max-width: 991px) {
          .register-card {
            flex-direction: column;
            max-width: 95%;
          }
          .register-left {
            width: 100%;
            min-height: 250px;
          }
          .register-right {
            width: 100%;
            padding: 20px;
          }
        }

        @media (max-width: 576px) {
          .register-right input,
          .register-right textarea {
            font-size: 14px;
            padding: 8px;
          }
          .register-right button {
            width: 100%;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}
