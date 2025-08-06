// import React, { useState } from "react";
// import { useParams } from "react-router-dom";

// export default function BookingForm() {
//   const { eventId } = useParams();

//   const [formData, setFormData] = useState({
//     name: "",
//     eventDate: "",
//     package: "silver",
//     guests: "",
//     totalAmount: 0,
//     finalAmount: 0,
//     advance: 0,
//     balance: 0,
//   });

//   const TAX = 18;

//   const packageRates = {
//     silver: { base: 100000, extra: 50000 },
//     gold: { base: 125000, extra: 70000 },
//     platinum: { base: 150000, extra: 85000 },
//   };

//   // ✅ Slab-based total + final + balance calculation
//   const calculateAmounts = (updatedData) => {
//     const guests = parseInt(updatedData.guests || 0);
//     const advance = parseFloat(updatedData.advance || 0);
//     const selectedPackage = updatedData.package;

//     let totalAmount = 0;

//     if (guests > 0) {
//       const { base, extra } = packageRates[selectedPackage];
//       if (guests <= 200) {
//         totalAmount = base;
//       } else {
//         const extraGuests = guests - 200;
//         const extraSlabs = Math.ceil(extraGuests / 200);
//         totalAmount = base + extraSlabs * extra;
//       }
//     }

//     const finalAmount = totalAmount + (totalAmount * TAX) / 100;
//     const balance = finalAmount - advance;

//     return {
//       totalAmount: totalAmount.toFixed(2),
//       finalAmount: finalAmount.toFixed(2),
//       balance: balance.toFixed(2),
//     };
//   };

//   // ✅ Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const updatedData = { ...formData, [name]: value };
//     const amounts = calculateAmounts(updatedData);
//     setFormData({
//       ...updatedData,
//       ...amounts,
//     });
//   };

//   // ✅ Submit Booking
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (parseInt(formData.guests) < 100) {
//       alert("⚠ Minimum 100 guests are required!");
//       return;
//     }

//     alert(`✅ Event ${eventId} booked successfully!`);
//     console.log("Booking Data:", formData);
//     // You can later send this data to your Spring Boot API
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="text-center mb-4 fw-bold">
//         🎉 Booking for Event #{eventId}
//       </h2>

//       <form
//         onSubmit={handleSubmit}
//         className="p-4 shadow-lg rounded-4 bg-white mx-auto"
//         style={{ maxWidth: "700px" }}
//       >
//         {/* Name */}
//         <div className="mb-3">
//           <label className="fw-semibold">Your Name</label>
//           <input
//             name="name"
//             type="text"
//             className="form-control"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Date */}
//         <div className="mb-3">
//           <label className="fw-semibold">Event Date</label>
//           <input
//             name="eventDate"
//             type="date"
//             className="form-control"
//             value={formData.eventDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Package */}
//         <div className="mb-3">
//           <label className="fw-semibold">Select Package</label>
//           <select
//             name="package"
//             className="form-control"
//             value={formData.package}
//             onChange={handleChange}
//           >
//             <option value="silver">Silver</option>
//             <option value="gold">Gold</option>
//             <option value="platinum">Platinum</option>
//           </select>
//         </div>

//         {/* Guests */}
//         <div className="mb-3">
//           <label className="fw-semibold">Number of Guests (Min 100)</label>
//           <input
//             type="number"
//             name="guests"
//             className="form-control"
//             value={formData.guests}
//             onChange={handleChange}
//             required
//           />
//           {formData.guests && parseInt(formData.guests) < 100 && (
//             <p className="text-danger mt-1">⚠ Minimum 100 guests required!</p>
//           )}
//         </div>

//         {/* Advance */}
//         <div className="mb-3">
//           <label className="fw-semibold">Advance Payment (₹)</label>
//           <input
//             type="number"
//             name="advance"
//             className="form-control"
//             value={formData.advance}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Payment Summary */}
//         <div className="p-3 bg-light rounded-3 my-3">
//           <h5 className="fw-bold">💰 Payment Summary</h5>
//           <p>
//             <strong>Selected Package:</strong>{" "}
//             {formData.package.charAt(0).toUpperCase() +
//               formData.package.slice(1)}
//           </p>
//           <p>
//             <strong>Total Amount (Before Tax):</strong> ₹{formData.totalAmount}
//           </p>
//           <p>+ Tax (18%)</p>
//           <p className="fw-bold text-primary">
//             Final Amount: ₹{formData.finalAmount}
//           </p>
//           <p>Advance Paid: ₹{formData.advance}</p>
//           <p className="fw-bold text-danger">Balance: ₹{formData.balance}</p>
//         </div>

//         <button className="btn btn-success w-100 fw-bold">
//           ✅ Confirm Booking
//         </button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function BookingForm() {
  const { eventId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    eventDate: "",
    package: "silver",
    guests: "",
    venueName: "",
    venueAddress: "",
    decoration: "Traditional",
    cateringRequired: "no",
    cateringType: "",
    menuType: "",
    acceptTerms: false,
    totalAmount: 0,
    finalAmount: 0,
    advance: 0,
    balance: 0,
  });

  const TAX = 18;

  const packageRates = {
    silver: { base: 100000, extra: 40000 },
    gold: { base: 150000, extra: 25000 },
    platinum: { base: 200000, extra: 25000 },
  };

  const calculateAmounts = () => {
    const guests = parseInt(formData.guests || 0);
    const advance = parseFloat(formData.advance || 0);
    const selectedPackage = formData.package;

    let totalAmount = 0;

    // Package base + slab logic
    if (guests > 0) {
      const { base, extra } = packageRates[selectedPackage];
      if (guests <= 200) {
        totalAmount = base;
      } else {
        const extraGuests = guests - 200;
        const extraSlabs = Math.ceil(extraGuests / 200);
        totalAmount = base + extraSlabs * extra;
      }
    }

    // Catering calculation
    let cateringChargePerGuest = 0;
    if (formData.cateringRequired === "yes") {
      if (formData.cateringType === "veg") {
        cateringChargePerGuest =
          formData.menuType === "basic"
            ? 600
            : formData.menuType === "full"
            ? 900
            : 0;
      } else if (formData.cateringType === "nonveg") {
        cateringChargePerGuest =
          formData.menuType === "basic"
            ? 800
            : formData.menuType === "full"
            ? 1200
            : 0;
      }
    }

    const cateringCharges = guests * cateringChargePerGuest;
    totalAmount += cateringCharges;

    const finalAmount = totalAmount + (totalAmount * TAX) / 100;
    const balance = finalAmount - advance;

    setFormData((prevData) => ({
      ...prevData,
      totalAmount: totalAmount.toFixed(2),
      finalAmount: finalAmount.toFixed(2),
      balance: balance.toFixed(2),
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: fieldValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseInt(formData.guests) < 100) {
      alert("⚠ Minimum 100 guests are required!");
      return;
    }

    if (!formData.acceptTerms) {
      alert("⚠ Please accept the terms and conditions to proceed.");
      return;
    }

    alert(`✅ Event ${eventId} booked successfully!`);
    console.log("Booking Data:", formData);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">
        🎉 Booking for Event #{eventId}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="p-4 shadow-lg rounded-4 bg-white mx-auto"
        style={{ maxWidth: "700px" }}
      >
        {/* Name */}
        <div className="mb-3">
          <label className="fw-semibold">Your Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Date */}
        <div className="mb-3">
          <label className="fw-semibold">Event Date</label>
          <input
            name="eventDate"
            type="date"
            className="form-control"
            value={formData.eventDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Guests */}
        <div className="mb-3">
          <label className="fw-semibold">Number of Guests (Min 100)</label>
          <input
            type="number"
            name="guests"
            className="form-control"
            value={formData.guests}
            onChange={handleChange}
            required
          />
        </div>

        {/* Package */}
        <div className="mb-3">
          <label className="fw-semibold">Select Package</label>
          <select
            name="package"
            className="form-control"
            value={formData.package}
            onChange={handleChange}
          >
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>
        </div>

        {/* Venue */}
        <div className="mb-3">
          <label className="fw-semibold">Venue Name</label>
          <input
            name="venueName"
            type="text"
            className="form-control"
            value={formData.venueName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="fw-semibold">Venue Address</label>
          <textarea
            name="venueAddress"
            className="form-control"
            value={formData.venueAddress}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Decoration */}
        <div className="mb-3">
          <label className="fw-semibold">Decoration Theme</label>
          <select
            name="decoration"
            className="form-control"
            value={formData.decoration}
            onChange={handleChange}
          >
            <option value="Traditional">Traditional</option>
            <option value="Modern">Modern</option>
            <option value="Custom">Custom</option>
          </select>
        </div>

        {/* Catering Required */}
        <div className="mb-3">
          <label className="fw-semibold">Do you require catering?</label>
          <select
            name="cateringRequired"
            className="form-control"
            value={formData.cateringRequired}
            onChange={handleChange}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {/* Catering Type */}
        {formData.cateringRequired === "yes" && (
          <>
            <div className="mb-3">
              <label className="fw-semibold">Catering Type</label>
              <select
                name="cateringType"
                className="form-control"
                value={formData.cateringType}
                onChange={handleChange}
              >
                <option value="">-- Select --</option>
                <option value="veg">Veg</option>
                <option value="nonveg">Non-Veg</option>
              </select>
            </div>

            {/* Menu Type */}
            {formData.cateringType && (
              <div className="mb-3">
                <label className="fw-semibold">
                  {formData.cateringType === "veg"
                    ? "Veg Menu Type"
                    : "Non-Veg Menu Type"}
                </label>
                <select
                  name="menuType"
                  className="form-control"
                  value={formData.menuType}
                  onChange={handleChange}
                >
                  {formData.cateringType === "veg" ? (
                    <>
                      <option value="basic">Basic (₹600 per guest)</option>
                      <option value="full">
                        Full-Fledged (₹900 per guest)
                      </option>
                    </>
                  ) : (
                    <>
                      <option value="basic">Basic (₹800 per guest)</option>
                      <option value="full">
                        Full-Fledged (₹1200 per guest)
                      </option>
                    </>
                  )}
                </select>
              </div>
            )}
          </>
        )}

        {/* Advance */}
        <div className="mb-3">
          <label className="fw-semibold">Advance Payment (₹)</label>
          <input
            type="number"
            name="advance"
            className="form-control"
            value={formData.advance}
            onChange={handleChange}
          />
        </div>

        {/* Calculate Button */}
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-primary w-100 fw-bold"
            onClick={calculateAmounts}
          >
            💵 Calculate Amount
          </button>
        </div>

        {/* Terms */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="termsCheck"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            required
          />
          <label className="form-check-label" htmlFor="termsCheck">
            I agree to the <a href="#!">terms and conditions</a>.
          </label>
        </div>

        {/* Summary */}
        <div className="p-3 bg-light rounded-3 my-3">
          <h5 className="fw-bold">💰 Payment Summary</h5>
          <p>
            <strong>Package:</strong> {formData.package.toUpperCase()}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{formData.totalAmount}
          </p>
          <p>+ Tax (18%)</p>
          <p className="fw-bold text-primary">
            Final Amount: ₹{formData.finalAmount}
          </p>
          <p>Advance Paid: ₹{formData.advance}</p>
          <p className="fw-bold text-danger">Balance: ₹{formData.balance}</p>
        </div>

        <button className="btn btn-success w-100 fw-bold">
          ✅ Confirm Booking
        </button>
      </form>
    </div>
  );
}
