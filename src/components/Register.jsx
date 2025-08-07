import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    address: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First Name is required";
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

    setLoading(true);
    try {
      const response = await registerUser(formData);
      alert("✅ Registered Successfully!");
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "❌ Registration Failed";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center position-relative"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/images/registrationbackground.jpg"
          })`,
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
          <p
            className="text-center fw-bold mt-3 px-3"
            style={{ fontSize: "16px" }}
          >
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
              {
                id: "contactNumber",
                type: "text",
                placeholder: "Contact Number",
              },
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
                  className={`form-control rounded-3 ${errors[field.id] ? "is-invalid" : ""
                    }`}
                  style={{ padding: "10px", fontSize: "15px" }}
                  disabled={loading}
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
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className={`form-control rounded-3 ${errors.address ? "is-invalid" : ""
                  }`}
                style={{ padding: "10px", fontSize: "15px" }}
                disabled={loading}
              ></textarea>
              {errors.address && (
                <div className="invalid-feedback">{errors.address}</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-2">
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`form-control rounded-3 ${errors.password ? "is-invalid" : ""
                  }`}
                style={{ padding: "10px", fontSize: "15px" }}
                disabled={loading}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
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
                  !loading &&
                  (e.target.style.background =
                    "linear-gradient(135deg, #00f2fe, #4facfe)")
                }
                onMouseOut={(e) =>
                (e.target.style.background =
                  "linear-gradient(135deg, #4facfe, #00f2fe)")
                }
                disabled={loading}
              >
                {loading ? "Registering..." : "Submit"}
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
