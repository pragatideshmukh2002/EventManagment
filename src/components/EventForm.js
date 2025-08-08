// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import {
//   createEvent,
//   checkDateAvailability,
//   calculateEventAmounts,
// } from "../services/api";

// export default function BookingForm() {
//   const { eventId } = useParams();

//   const [formData, setFormData] = useState({
//     name: "",
//     eventDate: "",
//     package: "silver",
//     guests: "",
//     venueName: "",
//     venueAddress: "",
//     decoration: "Traditional",
//     cateringRequired: "no",
//     cateringType: "",
//     menuType: "",
//     acceptTerms: false,
//     totalAmount: 0,
//     finalAmount: 0,
//     advance: 0,
//     balance: 0,
//   });

//   const [dateAvailability, setDateAvailability] = useState({
//     checked: false,
//     available: true,
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);

//   const TAX = 18;

//   const packageRates = {
//     silver: { base: 100000, extra: 40000 },
//     gold: { base: 150000, extra: 25000 },
//     platinum: { base: 200000, extra: 25000 },
//   };

//   // Check date availability when date changes
//   useEffect(() => {
//     if (formData.eventDate) {
//       checkDateAvailabilityHandler(formData.eventDate);
//     }
//   }, [formData.eventDate]);

//   const checkDateAvailabilityHandler = async (date) => {
//     if (!date) return;

//     setLoading(true);
//     try {
//       const response = await checkDateAvailability(date);
//       const result = response.data;

//       setDateAvailability({
//         checked: true,
//         available: result.available,
//         message: result.message,
//       });
//     } catch (error) {
//       console.error("Error checking date availability:", error);
//       setDateAvailability({
//         checked: true,
//         available: false,
//         message: "Error checking date availability. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateAmounts = async () => {
//     if (!formData.guests || formData.guests < 100) {
//       alert("⚠ Minimum 100 guests are required!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const eventData = {
//         customerName: formData.name,
//         eventDate: formData.eventDate,
//         packageType: formData.package,
//         numberOfGuests: parseInt(formData.guests),
//         venueName: formData.venueName,
//         venueAddress: formData.venueAddress,
//         decoration: formData.decoration,
//         cateringRequired: formData.cateringRequired,
//         cateringType: formData.cateringType,
//         menuType: formData.menuType,
//         advanceAmount: parseFloat(formData.advance || 0),
//       };

//       const response = await calculateEventAmounts(eventData);
//       const calculatedEvent = response.data.event;

//       setFormData((prev) => ({
//         ...prev,
//         totalAmount: calculatedEvent.totalAmount,
//         finalAmount: calculatedEvent.finalAmount,
//         balance: calculatedEvent.balanceAmount,
//       }));

//       alert("✅ Amount calculated successfully!");
//     } catch (error) {
//       console.error("Error calculating amounts:", error);
//       alert("❌ Error calculating amounts. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handleChange = (e) => {
//   //   const { name, value, type, checked } = e.target;
//   //   const fieldValue = type === "checkbox" ? checked : value;

//   //   setFormData({
//   //     ...formData,
//   //     [name]: fieldValue,
//   //   });
//   // };

//   const handleChange = (e) => {
//   const { name, value, type, checked } = e.target;
//   const fieldValue = type === "checkbox" ? checked : value;

//   if (name === "cateringType") {
//     // Set default menuType when cateringType is selected
//     setFormData((prev) => ({
//       ...prev,
//       [name]: fieldValue,
//       menuType: "basic", // Always default to first option
//     }));
//   } else {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: fieldValue,
//     }));
//   }
// };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (parseInt(formData.guests) < 100) {
//       alert("⚠ Minimum 100 guests are required!");
//       return;
//     }

//     if (!formData.acceptTerms) {
//       alert("⚠ Please accept the terms and conditions to proceed.");
//       return;
//     }

//     if (!dateAvailability.available) {
//       alert("⚠ Selected date is not available. Please choose another date.");
//       return;
//     }

//     setSubmitLoading(true);
//     try {
//       const eventData = {
//         customerName: formData.name,
//         eventDate: formData.eventDate,
//         packageType: formData.package,
//         numberOfGuests: parseInt(formData.guests),
//         venueName: formData.venueName,
//         venueAddress: formData.venueAddress,
//         decoration: formData.decoration,
//         cateringRequired: formData.cateringRequired,
//         cateringType: formData.cateringType,
//         menuType: formData.menuType,
//         advanceAmount: parseFloat(formData.advance || 0),
//         totalAmount: parseFloat(formData.totalAmount || 0),
//         finalAmount: parseFloat(formData.finalAmount || 0),
//         balanceAmount: parseFloat(formData.balance || 0),
//       };

//       const response = await createEvent(eventData);

//       if (response.data.success) {
//         alert(`✅ Event ${eventId} booked successfully!`);
//         console.log("Booking Data:", response.data.event);
//         // Reset form or redirect
//         setFormData({
//           name: "",
//           eventDate: "",
//           package: "silver",
//           guests: "",
//           venueName: "",
//           venueAddress: "",
//           decoration: "Traditional",
//           cateringRequired: "no",
//           cateringType: "",
//           menuType: "",
//           acceptTerms: false,
//           totalAmount: 0,
//           finalAmount: 0,
//           advance: 0,
//           balance: 0,
//         });
//         setDateAvailability({
//           checked: false,
//           available: true,
//           message: "",
//         });
//       } else {
//         alert(`❌ ${response.data.message}`);
//       }
//     } catch (error) {
//       console.error("Error creating event:", error);
//       if (error.response?.data?.message) {
//         alert(`❌ ${error.response.data.message}`);
//       } else {
//         alert("❌ Error creating event. Please try again.");
//       }
//     } finally {
//       setSubmitLoading(false);
//     }
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
//             className={`form-control ${
//               dateAvailability.checked && !dateAvailability.available
//                 ? "is-invalid"
//                 : ""
//             }`}
//             value={formData.eventDate}
//             onChange={handleChange}
//             required
//           />
//           {loading && (
//             <div className="mt-1">
//               <small className="text-muted">
//                 Checking date availability...
//               </small>
//             </div>
//           )}
//           {dateAvailability.checked && (
//             <div
//               className={`mt-1 ${
//                 dateAvailability.available ? "text-success" : "text-danger"
//               }`}
//             >
//               <small>{dateAvailability.message}</small>
//             </div>
//           )}
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

//         {/* Venue */}
//         <div className="mb-3">
//           <label className="fw-semibold">Venue Name</label>
//           <input
//             name="venueName"
//             type="text"
//             className="form-control"
//             value={formData.venueName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Address */}
//         <div className="mb-3">
//           <label className="fw-semibold">Venue Address</label>
//           <textarea
//             name="venueAddress"
//             className="form-control"
//             value={formData.venueAddress}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>

//         {/* Decoration */}
//         <div className="mb-3">
//           <label className="fw-semibold">Decoration Theme</label>
//           <select
//             name="decoration"
//             className="form-control"
//             value={formData.decoration}
//             onChange={handleChange}
//           >
//             <option value="Traditional">Traditional</option>
//             <option value="Modern">Modern</option>
//             <option value="Custom">Custom</option>
//           </select>
//         </div>

//         {/* Catering Required */}
//         <div className="mb-3">
//           <label className="fw-semibold">Do you require catering?</label>
//           <select
//             name="cateringRequired"
//             className="form-control"
//             value={formData.cateringRequired}
//             onChange={handleChange}
//           >
//             <option value="no">No</option>
//             <option value="yes">Yes</option>
//           </select>
//         </div>

//         {/* Catering Type */}
//         {formData.cateringRequired === "yes" && (
//           <>
//             <div className="mb-3">
//               <label className="fw-semibold">Catering Type</label>
//               <select
//                 name="cateringType"
//                 className="form-control"
//                 value={formData.cateringType}
//                 onChange={handleChange}
//               >
//                 <option value="">-- Select --</option>
//                 <option value="veg">Veg</option>
//                 <option value="nonveg">Non-Veg</option>
//               </select>
//             </div>

//             {/* Menu Type */}
//             {formData.cateringType && (
//               <div className="mb-3">
//                 <label className="fw-semibold">
//                   {formData.cateringType === "veg"
//                     ? "Veg Menu Type"
//                     : "Non-Veg Menu Type"}
//                 </label>
//                 <select
//                   name="menuType"
//                   className="form-control"
//                   value={formData.menuType}
//                   onChange={handleChange}
//                 >
//                   {formData.cateringType === "veg" ? (
//                     <>
//                       <option value="basic">Basic (₹600 per guest)</option>
//                       <option value="full">
//                         Full-Fledged (₹900 per guest)
//                       </option>
//                     </>
//                   ) : (
//                     <>
//                       <option value="basic">Basic (₹800 per guest)</option>
//                       <option value="full">
//                         Full-Fledged (₹1200 per guest)
//                       </option>
//                     </>
//                   )}
//                 </select>
//               </div>
//             )}
//           </>
//         )}

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

//         {/* Calculate Button */}
//         <div className="mb-3">
//           <button
//             type="button"
//             className="btn btn-primary w-100 fw-bold"
//             onClick={calculateAmounts}
//             disabled={loading}
//           >
//             {loading ? "⏳ Calculating..." : "💵 Calculate Amount"}
//           </button>
//         </div>

//         {/* Terms */}
//         <div className="form-check mb-3">
//           <input
//             className="form-check-input"
//             type="checkbox"
//             id="termsCheck"
//             name="acceptTerms"
//             checked={formData.acceptTerms}
//             onChange={handleChange}
//             required
//           />
//           <label className="form-check-label" htmlFor="termsCheck">
//             I agree to the <a href="#!">terms and conditions</a>.
//           </label>
//         </div>

//         {/* Summary */}
//         <div className="p-3 bg-light rounded-3 my-3">
//           <h5 className="fw-bold">💰 Payment Summary</h5>
//           <p>
//             <strong>Package:</strong> {formData.package.toUpperCase()}
//           </p>
//           <p>
//             <strong>Total Amount:</strong> ₹{formData.totalAmount}
//           </p>
//           <p>+ Tax (18%)</p>
//           <p className="fw-bold text-primary">
//             Final Amount: ₹{formData.finalAmount}
//           </p>
//           <p>Advance Paid: ₹{formData.advance}</p>
//           <p className="fw-bold text-danger">Balance: ₹{formData.balance}</p>
//         </div>

//         <button
//           className="btn btn-success w-100 fw-bold"
//           disabled={submitLoading || !dateAvailability.available}
//         >
//           {submitLoading ? "⏳ Processing..." : "✅ Confirm Booking"}
//         </button>
//       </form>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// import {
//   createEvent,
//   checkDateAvailability,
//   calculateEventAmounts,
// } from "../services/api";

// export default function BookingForm() {
//   const { eventId } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     eventDate: "",
//     package: "silver",
//     guests: "",
//     venueName: "",
//     venueAddress: "",
//     decoration: "Traditional",
//     cateringRequired: "no",
//     cateringType: "",
//     menuType: "",
//     acceptTerms: false,
//     totalAmount: 0,
//     finalAmount: 0,
//     advance: 0,
//     balance: 0,
//   });

//   const [dateAvailability, setDateAvailability] = useState({
//     checked: false,
//     available: true,
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);

//   useEffect(() => {
//     if (formData.eventDate) {
//       checkDateAvailabilityHandler(formData.eventDate);
//     }
//   }, [formData.eventDate]);

//   const checkDateAvailabilityHandler = async (date) => {
//     if (!date) return;

//     setLoading(true);
//     try {
//       const response = await checkDateAvailability(date);
//       const result = response.data;

//       setDateAvailability({
//         checked: true,
//         available: result.available,
//         message: result.message,
//       });
//     } catch (error) {
//       console.error("Error checking date availability:", error);
//       setDateAvailability({
//         checked: true,
//         available: false,
//         message: "Error checking date availability. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateAmounts = async () => {
//     if (!formData.guests || formData.guests < 100) {
//       alert("⚠ Minimum 100 guests are required!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const eventData = {
//         customerName: formData.name,
//         eventDate: formData.eventDate,
//         packageType: formData.package,
//         numberOfGuests: parseInt(formData.guests),
//         venueName: formData.venueName,
//         venueAddress: formData.venueAddress,
//         decoration: formData.decoration,
//         cateringRequired: formData.cateringRequired,
//         cateringType: formData.cateringType,
//         menuType: formData.menuType,
//         advanceAmount: parseFloat(formData.advance || 0),
//       };

//       const response = await calculateEventAmounts(eventData);
//       const calculatedEvent = response.data.event;

//       setFormData((prev) => ({
//         ...prev,
//         totalAmount: calculatedEvent.totalAmount,
//         finalAmount: calculatedEvent.finalAmount,
//         balance: calculatedEvent.balanceAmount,
//       }));

//       alert("✅ Amount calculated successfully!");
//     } catch (error) {
//       console.error("Error calculating amounts:", error);
//       alert("❌ Error calculating amounts. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const fieldValue = type === "checkbox" ? checked : value;

//     if (name === "cateringType") {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: fieldValue,
//         menuType: "basic", // default menu
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: fieldValue,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (parseInt(formData.guests) < 100) {
//       alert("⚠ Minimum 100 guests are required!");
//       return;
//     }

//     if (!formData.acceptTerms) {
//       alert("⚠ Please accept the terms and conditions to proceed.");
//       return;
//     }

//     if (!dateAvailability.available) {
//       alert("⚠ Selected date is not available. Please choose another date.");
//       return;
//     }

//     setSubmitLoading(true);
//     try {
//       const eventData = {
//         customerName: formData.name,
//         eventDate: formData.eventDate,
//         packageType: formData.package,
//         numberOfGuests: parseInt(formData.guests),
//         venueName: formData.venueName,
//         venueAddress: formData.venueAddress,
//         decoration: formData.decoration,
//         cateringRequired: formData.cateringRequired,
//         cateringType: formData.cateringType,
//         menuType: formData.menuType,
//         advanceAmount: parseFloat(formData.advance || 0),
//         totalAmount: parseFloat(formData.totalAmount || 0),
//         finalAmount: parseFloat(formData.finalAmount || 0),
//         balanceAmount: parseFloat(formData.balance || 0),
//       };

//       const response = await createEvent(eventData);

//       if (response.data.success) {
//         const bookingData = response.data.event;

//         alert(`✅ Event ${eventId} booked successfully!`);
//         navigate("/payment", { state: { booking: bookingData } });
//       } else {
//         alert(`❌ ${response.data.message}`);
//       }
//     } catch (error) {
//       console.error("Error creating event:", error);
//       if (error.response?.data?.message) {
//         alert(`❌ ${error.response.data.message}`);
//       } else {
//         alert("❌ Error creating event. Please try again.");
//       }
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="text-center mb-4 fw-bold"> Booking for Event {eventId}</h2>

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

//         {/* Event Date */}
//         <div className="mb-3">
//           <label className="fw-semibold">Event Date</label>
//           <input
//             name="eventDate"
//             type="date"
//             className={`form-control ${dateAvailability.checked && !dateAvailability.available ? "is-invalid" : ""}`}
//             value={formData.eventDate}
//             onChange={handleChange}
//             required
//           />
//           {loading && <div className="text-muted mt-1">Checking date availability...</div>}
//           {dateAvailability.checked && (
//             <div className={`mt-1 ${dateAvailability.available ? "text-success" : "text-danger"}`}>
//               <small>{dateAvailability.message}</small>
//             </div>
//           )}
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

//         {/* Venue Name */}
//         <div className="mb-3">
//           <label className="fw-semibold">Venue Name</label>
//           <input
//             name="venueName"
//             type="text"
//             className="form-control"
//             value={formData.venueName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Venue Address */}
//         <div className="mb-3">
//           <label className="fw-semibold">Venue Address</label>
//           <textarea
//             name="venueAddress"
//             className="form-control"
//             value={formData.venueAddress}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>

//         {/* Decoration */}
//         <div className="mb-3">
//           <label className="fw-semibold">Decoration Theme</label>
//           <select
//             name="decoration"
//             className="form-control"
//             value={formData.decoration}
//             onChange={handleChange}
//           >
//             <option value="Traditional">Traditional</option>
//             <option value="Modern">Modern</option>
//             <option value="Custom">Custom</option>
//           </select>
//         </div>

//         {/* Catering Required */}
//         <div className="mb-3">
//           <label className="fw-semibold">Do you require catering?</label>
//           <select
//             name="cateringRequired"
//             className="form-control"
//             value={formData.cateringRequired}
//             onChange={handleChange}
//           >
//             <option value="no">No</option>
//             <option value="yes">Yes</option>
//           </select>
//         </div>

//         {/* Catering Type */}
//         {formData.cateringRequired === "yes" && (
//           <>
//             <div className="mb-3">
//               <label className="fw-semibold">Catering Type</label>
//               <select
//                 name="cateringType"
//                 className="form-control"
//                 value={formData.cateringType}
//                 onChange={handleChange}
//               >
//                 <option value="">-- Select --</option>
//                 <option value="veg">Veg</option>
//                 <option value="nonveg">Non-Veg</option>
//               </select>
//             </div>

//             {/* Menu Type */}
//             {formData.cateringType && (
//               <div className="mb-3">
//                 <label className="fw-semibold">
//                   {formData.cateringType === "veg"
//                     ? "Veg Menu Type"
//                     : "Non-Veg Menu Type"}
//                 </label>
//                 <select
//                   name="menuType"
//                   className="form-control"
//                   value={formData.menuType}
//                   onChange={handleChange}
//                 >
//                   {formData.cateringType === "veg" ? (
//                     <>
//                       <option value="basic">Basic (₹600 per guest)</option>
//                       <option value="full">Full-Fledged (₹900 per guest)</option>
//                     </>
//                   ) : (
//                     <>
//                       <option value="basic">Basic (₹800 per guest)</option>
//                       <option value="full">Full-Fledged (₹1200 per guest)</option>
//                     </>
//                   )}
//                 </select>
//               </div>
//             )}
//           </>
//         )}

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

//         {/* Calculate Button */}
//         <div className="mb-3">
//           <button
//             type="button"
//             className="btn btn-primary w-100"
//             onClick={calculateAmounts}
//             disabled={loading}
//           >
//             {loading ? "⏳ Calculating..." : "💵 Calculate Amount"}
//           </button>
//         </div>

//         {/* Terms */}
//         <div className="form-check mb-3">
//           <input
//             className="form-check-input"
//             type="checkbox"
//             id="termsCheck"
//             name="acceptTerms"
//             checked={formData.acceptTerms}
//             onChange={handleChange}
//             required
//           />
//           <label className="form-check-label" htmlFor="termsCheck">
//             I agree to the <a href="#!">terms and conditions</a>.
//           </label>
//         </div>

//         {/* Payment Summary */}
//         <div className="bg-light p-3 rounded-3 mb-3">
//           <h5 className="fw-bold">💰 Payment Summary</h5>
//           <p><strong>Package:</strong> {formData.package.toUpperCase()}</p>
//           <p><strong>Total Amount:</strong> ₹{formData.totalAmount}</p>
//           <p>+ Tax (18%)</p>
//           <p className="text-primary fw-bold">Final Amount: ₹{formData.finalAmount}</p>
//           <p>Advance Paid: ₹{formData.advance}</p>
//           <p className="text-danger fw-bold">Balance: ₹{formData.balance}</p>
//         </div>

//         {/* Submit */}
//         <button
//           className="btn btn-success w-100 fw-bold"
//           disabled={submitLoading || !dateAvailability.available}
//         >
//           {submitLoading ? "⏳ Processing..." : "✅ Confirm Booking"}
//         </button>
//       </form>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  createEvent,
  checkDateAvailability,
  calculateEventAmounts,
} from "../services/api";

export default function EventForm() {
  const { type: eventId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Get event title from navigation state or fallback to eventId
  const eventTitle = location.state?.title || eventId;

  const [formData, setFormData] = useState({
    bookingFormTitle: eventTitle || "", 
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

  const [dateAvailability, setDateAvailability] = useState({
    checked: false,
    available: true,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (formData.eventDate) {
      checkDateAvailabilityHandler(formData.eventDate);
    }
  }, [formData.eventDate]);

  const checkDateAvailabilityHandler = async (date) => {
    if (!date) return;

    setLoading(true);
    try {
      const response = await checkDateAvailability(date);
      const result = response.data;

      setDateAvailability({
        checked: true,
        available: result.available,
        message: result.message,
      });
    } catch (error) {
      console.error("Error checking date availability:", error);
      setDateAvailability({
        checked: true,
        available: false,
        message: "Error checking date availability. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateAmounts = async () => {
    if (!formData.guests || formData.guests < 100) {
      alert("⚠ Minimum 100 guests are required!");
      return;
    }

    setLoading(true);
    try {
      const eventData = {
        customerName: formData.name,
        eventDate: formData.eventDate,
        packageType: formData.package,
        numberOfGuests: parseInt(formData.guests),
        venueName: formData.venueName,
        venueAddress: formData.venueAddress,
        decoration: formData.decoration,
        cateringRequired: formData.cateringRequired,
        cateringType: formData.cateringType,
        menuType: formData.menuType,
        advanceAmount: parseFloat(formData.advance || 0),
      };

      const response = await calculateEventAmounts(eventData);
      const calculatedEvent = response.data.event;

      setFormData((prev) => ({
        ...prev,
        totalAmount: calculatedEvent.totalAmount,
        finalAmount: calculatedEvent.finalAmount,
        balance: calculatedEvent.balanceAmount,
      }));

      alert("✅ Amount calculated successfully!");
    } catch (error) {
      console.error("Error calculating amounts:", error);
      alert("❌ Error calculating amounts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    if (name === "cateringType") {
      setFormData((prev) => ({
        ...prev,
        [name]: fieldValue,
        menuType: "basic", // default menu
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: fieldValue,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(formData.guests) < 100) {
      alert("⚠ Minimum 100 guests are required!");
      return;
    }

    if (!formData.acceptTerms) {
      alert("⚠ Please accept the terms and conditions to proceed.");
      return;
    }

    if (!dateAvailability.available) {
      alert("⚠ Selected date is not available. Please choose another date.");
      return;
    }

    setSubmitLoading(true);
    try {
      const eventData = {
        bookingFormTitle: formData.bookingFormTitle,
        customerName: formData.name,
        eventDate: formData.eventDate,
        packageType: formData.package,
        numberOfGuests: parseInt(formData.guests),
        venueName: formData.venueName,
        venueAddress: formData.venueAddress,
        decoration: formData.decoration,
        cateringRequired: formData.cateringRequired,
        cateringType: formData.cateringType,
        menuType: formData.menuType,
        advanceAmount: parseFloat(formData.advance || 0),
        totalAmount: parseFloat(formData.totalAmount || 0),
        finalAmount: parseFloat(formData.finalAmount || 0),
        balanceAmount: parseFloat(formData.balance || 0),
      };

      const response = await createEvent(eventData);

      if (response.data.success) {
        const bookingData = response.data.event;

        alert(`✅ Event ${eventTitle} booked successfully!`);
        navigate("/payment", { state: { booking: bookingData } });
      } else {
        alert(`❌ ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      if (error.response?.data?.message) {
        alert(`❌ ${error.response.data.message}`);
      } else {
        alert("❌ Error creating event. Please try again.");
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">Booking for: {eventTitle}</h2>

      <form
        onSubmit={handleSubmit}
        className="p-4 shadow-lg rounded-4 bg-white mx-auto"
        style={{ maxWidth: "700px" }}
      >
        {/* Your form fields */}
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

        <div className="mb-3">
          <label className="fw-semibold">Event Date</label>
          <input
            name="eventDate"
            type="date"
            className={`form-control ${
              dateAvailability.checked && !dateAvailability.available ? "is-invalid" : ""
            }`}
            value={formData.eventDate}
            onChange={handleChange}
            required
          />
          {loading && <div className="text-muted mt-1">Checking date availability...</div>}
          {dateAvailability.checked && (
            <div className={`mt-1 ${dateAvailability.available ? "text-success" : "text-danger"}`}>
              <small>{dateAvailability.message}</small>
            </div>
          )}
        </div>

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

        <div className="mb-3">
          <label className="fw-semibold">Venue Address</label>
          <textarea
            name="venueAddress"
            className="form-control"
            value={formData.venueAddress}
            onChange={handleChange}
            required
          />
        </div>

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
                      <option value="full">Full-Fledged (₹900 per guest)</option>
                    </>
                  ) : (
                    <>
                      <option value="basic">Basic (₹800 per guest)</option>
                      <option value="full">Full-Fledged (₹1200 per guest)</option>
                    </>
                  )}
                </select>
              </div>
            )}
          </>
        )}

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

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={calculateAmounts}
            disabled={loading}
          >
            {loading ? "⏳ Calculating..." : "💵 Calculate Amount"}
          </button>
        </div>

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

        <div className="bg-light p-3 rounded-3 mb-3">
          <h5 className="fw-bold">💰 Payment Summary</h5>
          <p><strong>Package:</strong> {formData.package.toUpperCase()}</p>
          <p><strong>Total Amount:</strong> ₹{formData.totalAmount}</p>
          <p>+ Tax (18%)</p>
          <p className="text-primary fw-bold">Final Amount: ₹{formData.finalAmount}</p>
          <p>Advance Paid: ₹{formData.advance}</p>
          <p className="text-danger fw-bold">Balance: ₹{formData.balance}</p>
        </div>

        <button
          className="btn btn-success w-100 fw-bold"
          disabled={submitLoading || !dateAvailability.available}
        >
          {submitLoading ? "⏳ Processing..." : "✅ Confirm Booking"}
        </button>
      </form>
    </div>
  );
}
