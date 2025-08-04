import React, { useState } from "react";

export default function FarmBookingForm() {
  const [formData, setFormData] = useState({
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

  // ✅ Slab Calculation Based on Package
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    const amounts = calculateAmounts(updatedData);
    setFormData({
      ...updatedData,
      ...amounts,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(formData.guests) < 100) {
      alert("⚠ Minimum 100 guests are required!");
      return;
    }
    alert("✅ Booking Submitted Successfully!");
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">🏡 The Iconic Farm Booking</h2>

      <form
        onSubmit={handleSubmit}
        className="p-4 shadow-lg rounded-4 bg-white mx-auto"
        style={{ maxWidth: "700px" }}
      >
        {/* ✅ Package Selection */}
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

        {/* ✅ Number of Guests */}
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

        {/* ✅ Advance Payment */}
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

        {/* ✅ Payment Summary */}
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
