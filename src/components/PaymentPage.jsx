// import React from "react";
// import { useLocation } from "react-router-dom";

// export default function PaymentPage() {
//   const location = useLocation();
//   const bookingData = location.state?.booking;

//   if (!bookingData) {
//     return <div className="text-center mt-5">❌ No booking data found!</div>;
//   }

//   const loadRazorpay = (order) => {
//     const options = {
//       key: "rzp_test_s7RTLvVYmptGbh",  // Razorpay Test Key ID
//       amount: order.amount,
//       currency: order.currency,
//       name: "Your Company Name",
//       description: "Event Booking Payment",
//       order_id: order.id,
//       handler: function (response) {
//         alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
//         // TODO: verify payment on backend and update booking status
//       },
//       prefill: {
//         name: bookingData.customerName,
//         email: bookingData.email || "",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };
//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   const handlePayment = async () => {
//     try {
//       const response = await fetch("http://localhost:7777/create-order", {  // Adjust port if needed
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: bookingData.balanceAmount }),  // Amount in INR
//       });

//       if (!response.ok) {
//         alert("Failed to create order. Please try again.");
//         return;
//       }

//       const orderString = await response.text();
//       const order = JSON.parse(orderString);

//       loadRazorpay(order);
//     } catch (error) {
//       console.error("Payment error:", error);
//       alert("Payment failed. Please try again.");
//     }
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="mb-4 text-center">💳 Payment Page</h2>

//       <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
//         <h4 className="mb-3">Hello, {bookingData.customerName}</h4>

//         <p><strong>Event Date:</strong> {bookingData.eventDate}</p>
//         <p><strong>Total Amount:</strong> ₹{bookingData.totalAmount}</p>
//         <p><strong>Advance Paid:</strong> ₹{bookingData.advanceAmount}</p>
//         <p><strong>Balance:</strong> ₹{bookingData.balanceAmount}</p>

//         <button onClick={handlePayment} className="btn btn-primary w-100 mt-3">
//           💳 Pay Now
//         </button>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { useLocation } from "react-router-dom";

export default function PaymentPage() {
  const location = useLocation();
  const bookingData = location.state?.booking;

  if (!bookingData) {
    return <div className="text-center mt-5">❌ No booking data found!</div>;
  }

  const loadRazorpay = (order) => {
    const options = {
      key: "rzp_test_s7RTLvVYmptGbh",  // Your Razorpay Test Key
      amount: order.amount,
      currency: order.currency,
      name: "Your Company Name",
      description: "Event Booking Payment",
      order_id: order.id,
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        // TODO: verify payment on backend and update booking status
      },
      prefill: {
        name: bookingData.customerName,
        email: bookingData.email || "",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:7777/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: bookingData.balanceAmount }),
      });

      if (!response.ok) {
        alert("Failed to create order. Please try again.");
        return;
      }

      const orderString = await response.text();
      const order = JSON.parse(orderString);

      loadRazorpay(order);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  // UPI Payment details
  const upiId = "yourupiid@bank"; // Apna UPI ID yahan daalein
  // QR code generate karne ke liye UPI payment URL (amount dynamically add kiya gaya)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=${upiId}&pn=YourCompanyName&am=${bookingData.balanceAmount}`;

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">💳 Payment Page</h2>

      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h4 className="mb-3">Hello, {bookingData.customerName}</h4>

        <p><strong>Event Date:</strong> {bookingData.eventDate}</p>
        <p><strong>Total Amount:</strong> ₹{bookingData.totalAmount}</p>
        <p><strong>Advance Paid:</strong> ₹{bookingData.advanceAmount}</p>
        <p><strong>Balance:</strong> ₹{bookingData.balanceAmount}</p>

        {/* Razorpay Payment Button */}
        <button onClick={handlePayment} className="btn btn-primary w-100 mt-3">
          💳 Pay Now (Razorpay)
        </button>

        <hr />

        {/* UPI Payment Section */}
        <div className="text-center mt-4">
          <h5>Or pay via UPI</h5>
          <img
            src={qrCodeUrl}
            alt="UPI QR Code"
            style={{ marginBottom: "10px", cursor: "pointer" }}
            onClick={() => window.open(qrCodeUrl, "_blank")}
          />
          <p><strong>UPI ID:</strong> {upiId}</p>
          <p>Scan the QR code or use the UPI ID in your UPI app to pay ₹{bookingData.balanceAmount}</p>
        </div>
      </div>
    </div>
  );
}
