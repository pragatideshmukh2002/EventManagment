import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function BookingForm() {
  const { eventId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    eventDate: "",
    package: "silver",
    guests: "",
    totalAmount: 0,
    finalAmount: 0,
    advance: 0,
    balance: 0,
  });

  const TAX = 18;

  const packageRates = {
    silver: { base: 100000, extra: 50000 },
    gold: { base: 125000, extra: 70000 },
    platinum: { base: 150000, extra: 85000 },
  };

  // ✅ Slab-based total + final + balance calculation
  const calculateAmounts = (updatedData) => {
    const guests = parseInt(updatedData.guests || 0);
    const advance = parseFloat(updatedData.advance || 0);
    const selectedPackage = updatedData.package;

    let totalAmount = 0;

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

    const finalAmount = totalAmount + (totalAmount * TAX) / 100;
    const balance = finalAmount - advance;

    return {
      totalAmount: totalAmount.toFixed(2),
      finalAmount: finalAmount.toFixed(2),
      balance: balance.toFixed(2),
    };
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    const amounts = calculateAmounts(updatedData);
    setFormData({
      ...updatedData,
      ...amounts,
    });
  };

  // ✅ Submit Booking
  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseInt(formData.guests) < 100) {
      alert("⚠ Minimum 100 guests are required!");
      return;
    }

    alert(`✅ Event ${eventId} booked successfully!`);
    console.log("Booking Data:", formData);
    // You can later send this data to your Spring Boot API
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
          {formData.guests && parseInt(formData.guests) < 100 && (
            <p className="text-danger mt-1">⚠ Minimum 100 guests required!</p>
          )}
        </div>

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

        {/* Payment Summary */}
        <div className="p-3 bg-light rounded-3 my-3">
          <h5 className="fw-bold">💰 Payment Summary</h5>
          <p>
            <strong>Selected Package:</strong>{" "}
            {formData.package.charAt(0).toUpperCase() +
              formData.package.slice(1)}
          </p>
          <p>
            <strong>Total Amount (Before Tax):</strong> ₹{formData.totalAmount}
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
