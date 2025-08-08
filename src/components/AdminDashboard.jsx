// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   getAllEvents,
//   getUpcomingEvents,
//   getPastEvents,
//   deleteEvent,
//   getEventsByCustomer,
// } from "../services/api";

// export default function EventDashboard() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const adminToken = localStorage.getItem("adminToken");
//     if (!adminToken) {
//       navigate("/adminlogin");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     loadEvents();
//   }, [filter]);

//   const loadEvents = async () => {
//     setLoading(true);
//     try {
//       let response;
//       switch (filter) {
//         case "upcoming":
//           response = await getUpcomingEvents();
//           break;
//         case "past":
//           response = await getPastEvents();
//           break;
//         default:
//           response = await getAllEvents();
//       }
//       setEvents(response.data.events || []);
//     } catch (error) {
//       console.error("Error loading events:", error);
//       alert("Error loading events. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteEvent = async (eventId) => {
//     if (window.confirm("Are you sure you want to delete this event?")) {
//       try {
//         await deleteEvent(eventId);
//         alert("Event deleted successfully!");
//         loadEvents();
//       } catch (error) {
//         console.error("Error deleting event:", error);
//         alert("Error deleting event. Please try again.");
//       }
//     }
//   };

//   const handleSearch = async () => {
//     if (!searchTerm.trim()) {
//       loadEvents();
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await getEventsByCustomer(searchTerm);
//       setEvents(response.data.events || []);
//     } catch (error) {
//       console.error("Error searching events:", error);
//       alert("Error searching events. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//     }).format(amount);
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="text-center mb-4 fw-bold">📊 Event Management Dashboard</h2>

//       {/* Filters and Search */}
//       <div className="row g-3 mb-4">
//         <div className="col-lg-6">
//           <div className="input-group">
//             <select
//               className="form-select"
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//             >
//               <option value="all">All Events</option>
//               <option value="upcoming">Upcoming Events</option>
//               <option value="past">Past Events</option>
//             </select>
//             <button
//               className="btn btn-outline-secondary"
//               onClick={loadEvents}
//               disabled={loading}
//               title="Reload"
//             >
//               {loading ? "⏳" : "🔄"}
//             </button>
//           </div>
//         </div>

//         <div className="col-lg-6">
//           <div className="input-group">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by customer name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//             />
//             <button
//               className="btn btn-outline-primary"
//               onClick={handleSearch}
//               disabled={loading}
//             >
//               🔍
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Events Table */}
//       {loading ? (
//         <div className="text-center py-5">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       ) : events.length === 0 ? (
//         <div className="text-center py-5">
//           <h4 className="text-muted">No events found</h4>
//         </div>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-hover table-bordered align-middle">
//             <thead className="table-dark text-center">
//               <tr>
//                 <th>ID</th>
//                 <th>Customer</th>
//                 <th>Date</th>
//                 <th>Package</th>
//                 <th>Guests</th>
//                 <th>Venue</th>
//                 <th>Amount</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {events.map((event) => (
//                 <tr key={event.id} className="text-center">
//                   <td>{event.id}</td>
//                   <td>{event.customerName}</td>
//                   <td>{formatDate(event.eventDate)}</td>
//                   <td>
//                     <span
//                       className={`badge bg-${event.packageType === "platinum"
//                         ? "warning"
//                         : event.packageType === "gold"
//                           ? "info"
//                           : "secondary"
//                         }`}
//                     >
//                       {event.packageType.toUpperCase()}
//                     </span>
//                   </td>
//                   <td>{event.numberOfGuests}</td>
//                   <td>
//                     <small className="text-muted">{event.venueName}</small>
//                   </td>
//                   <td>{formatCurrency(event.finalAmount)}</td>
//                   <td>
//                     <span
//                       className={`badge bg-${event.bookingStatus === "CONFIRMED"
//                         ? "success"
//                         : "danger"
//                         }`}
//                     >
//                       {event.bookingStatus}
//                     </span>
//                   </td>
//                   <td>
//                     <div className="d-flex gap-2 justify-content-center">
//                       <button
//                         className="btn btn-sm btn-outline-info"
//                         onClick={() =>
//                           alert(`Event Details:\n${JSON.stringify(event, null, 2)}`)
//                         }
//                         title="View"
//                       >
//                         👁️
//                       </button>
//                       <button
//                         className="btn btn-sm btn-outline-danger"
//                         onClick={() => handleDeleteEvent(event.id)}
//                         title="Delete"
//                       >
//                         🗑️
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Summary Cards */}
//       {events.length > 0 && (
//         <div className="row g-3 mt-4">
//           <div className="col-md-6 col-lg-3">
//             <div className="card text-white bg-primary h-100">
//               <div className="card-body text-center">
//                 <h5 className="card-title">Total Events</h5>
//                 <h3>{events.length}</h3>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-6 col-lg-3">
//             <div className="card text-white bg-success h-100">
//               <div className="card-body text-center">
//                 <h5 className="card-title">Total Revenue</h5>
//                 <h3>
//                   {formatCurrency(
//                     events.reduce(
//                       (sum, event) => sum + parseFloat(event.finalAmount || 0),
//                       0
//                     )
//                   )}
//                 </h3>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-6 col-lg-3">
//             <div className="card text-white bg-info h-100">
//               <div className="card-body text-center">
//                 <h5 className="card-title">Avg. Guests</h5>
//                 <h3>
//                   {Math.round(
//                     events.reduce(
//                       (sum, event) => sum + (event.numberOfGuests || 0),
//                       0
//                     ) / events.length
//                   )}
//                 </h3>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-6 col-lg-3">
//             <div className="card text-white bg-warning h-100">
//               <div className="card-body text-center">
//                 <h5 className="card-title">Platinum Events</h5>
//                 <h3>
//                   {
//                     events.filter((event) => event.packageType === "platinum")
//                       .length
//                   }
//                 </h3>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-6 col-lg-3">
//   <div className="card text-white bg-warning h-100">
//     <div className="card-body text-center">
//       <h5 className="card-title">Platinum Events</h5>
//       <h3>{events.filter((event) => event.packageType === "platinum").length}</h3>
//     </div>
//   </div>
// </div>

// <div className="col-md-6 col-lg-3">
//   <div className="card text-white bg-info h-100">
//     <div className="card-body text-center">
//       <h5 className="card-title">Gold Events</h5>
//       <h3>{events.filter((event) => event.packageType === "gold").length}</h3>
//     </div>
//   </div>
// </div>

// <div className="col-md-6 col-lg-3">
//   <div className="card text-white bg-secondary h-100">
//     <div className="card-body text-center">
//       <h5 className="card-title">Silver Events</h5>
//       <h3>{events.filter((event) => event.packageType === "silver").length}</h3>
//     </div>
//   </div>
// </div>

//         </div>
//       )}
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   getAllEvents,
//   getUpcomingEvents,
//   getPastEvents,
//   deleteEvent,
//   getEventsByCustomer,
// } from "../services/api";

// export default function EventDashboard() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showDashboard, setShowDashboard] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const adminToken = localStorage.getItem("adminToken");
//     if (!adminToken) {
//       navigate("/adminlogin");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     if (showDashboard) {
//       loadEvents();
//     }
//   }, [filter, showDashboard]);

//   const loadEvents = async () => {
//     setLoading(true);
//     try {
//       let response;
//       switch (filter) {
//         case "upcoming":
//           response = await getUpcomingEvents();
//           break;
//         case "past":
//           response = await getPastEvents();
//           break;
//         default:
//           response = await getAllEvents();
//       }
//       setEvents(response.data.events || []);
//     } catch (error) {
//       console.error("Error loading events:", error);
//       alert("Error loading events. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteEvent = async (eventId) => {
//     if (window.confirm("Are you sure you want to delete this event?")) {
//       try {
//         await deleteEvent(eventId);
//         alert("Event deleted successfully!");
//         loadEvents();
//       } catch (error) {
//         console.error("Error deleting event:", error);
//         alert("Error deleting event. Please try again.");
//       }
//     }
//   };

//   const handleSearch = async () => {
//     if (!searchTerm.trim()) {
//       loadEvents();
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await getEventsByCustomer(searchTerm);
//       setEvents(response.data.events || []);
//     } catch (error) {
//       console.error("Error searching events:", error);
//       alert("Error searching events. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//     }).format(amount);
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="text-center mb-4 fw-bold">🎯 Admin Event Dashboard</h2>

//       {!showDashboard ? (
//         <div className="text-center py-5">
//           <button
//             className="btn btn-lg btn-success px-5 py-3"
//             onClick={() => setShowDashboard(true)}
//           >
//             📂 Load Events Dashboard
//           </button>
//         </div>
//       ) : (
//         <>
//           <div className="row g-3 mb-4 align-items-end">
//             <div className="col-md-4">
//               <label className="form-label fw-bold">Filter Events</label>
//               <div className="input-group">
//                 <select
//                   className="form-select"
//                   value={filter}
//                   onChange={(e) => setFilter(e.target.value)}
//                 >
//                   <option value="all">All Events</option>
//                   <option value="upcoming">Upcoming</option>
//                   <option value="past">Past</option>
//                 </select>
//                 <button
//                   className="btn btn-outline-secondary"
//                   onClick={loadEvents}
//                   disabled={loading}
//                   title="Reload"
//                 >
//                   {loading ? "⏳" : "🔄"}
//                 </button>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <label className="form-label fw-bold">Search by Customer</label>
//               <div className="input-group">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter customer name..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                 />
//                 <button
//                   className="btn btn-outline-primary"
//                   onClick={handleSearch}
//                   disabled={loading}
//                 >
//                   🔍
//                 </button>
//               </div>
//             </div>

//             <div className="col-md-4 text-end">
//               <button className="btn btn-danger" onClick={() => setShowDashboard(false)}>
//                 ❌ Hide Dashboard
//               </button>
//             </div>
//           </div>

//           {/* Events Table */}
//           {loading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </div>
//           ) : events.length === 0 ? (
//             <div className="text-center py-5">
//               <h4 className="text-muted">No events found</h4>
//             </div>
//           ) : (
//             <div className="table-responsive">
//               <table className="table table-hover table-bordered align-middle">
//                 <thead className="table-dark text-center">
//                   <tr>
//                     <th>ID</th>
//                     <th>Customer</th>
//                     <th>Date</th>
//                     <th>Package</th>
//                     <th>Guests</th>
//                     <th>Venue</th>
//                     <th>Amount</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {events.map((event) => (
//                     <tr key={event.id} className="text-center">
//                       <td>{event.id}</td>
//                       <td>{event.customerName}</td>
//                       <td>{formatDate(event.eventDate)}</td>
//                       <td>
//                         <span
//                           className={`badge bg-${event.packageType === "platinum"
//                             ? "warning"
//                             : event.packageType === "gold"
//                               ? "info"
//                               : "secondary"
//                             }`}
//                         >
//                           {event.packageType.toUpperCase()}
//                         </span>
//                       </td>
//                       <td>{event.numberOfGuests}</td>
//                       <td>
//                         <small className="text-muted">{event.venueName}</small>
//                       </td>
//                       <td>{formatCurrency(event.finalAmount)}</td>
//                       <td>
//                         <span
//                           className={`badge bg-${event.bookingStatus === "CONFIRMED"
//                             ? "success"
//                             : "danger"
//                             }`}
//                         >
//                           {event.bookingStatus}
//                         </span>
//                       </td>
//                       <td>
//                         <div className="d-flex gap-2 justify-content-center">
//                           <button
//                             className="btn btn-sm btn-outline-info"
//                             onClick={() =>
//                               alert(`Event Details:\n${JSON.stringify(event, null, 2)}`)
//                             }
//                           >
//                             👁️ View
//                           </button>
//                           <button
//                             className="btn btn-sm btn-outline-danger"
//                             onClick={() => handleDeleteEvent(event.id)}
//                           >
//                             🗑️ Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* Summary Cards */}
//           {events.length > 0 && (
//             <div className="row g-3 mt-4">
//               <SummaryCard title="Total Events" color="primary" value={events.length} />
//               <SummaryCard
//                 title="Total Revenue"
//                 color="success"
//                 value={formatCurrency(
//                   events.reduce((sum, e) => sum + parseFloat(e.finalAmount || 0), 0)
//                 )}
//               />
//               <SummaryCard
//                 title="Avg. Guests"
//                 color="info"
//                 value={Math.round(
//                   events.reduce((sum, e) => sum + (e.numberOfGuests || 0), 0) / events.length
//                 )}
//               />
//               <SummaryCard
//                 title="Platinum Events"
//                 color="warning"
//                 value={events.filter((e) => e.packageType === "platinum").length}
//               />
//               <SummaryCard
//                 title="Gold Events"
//                 color="info"
//                 value={events.filter((e) => e.packageType === "gold").length}
//               />
//               <SummaryCard
//                 title="Silver Events"
//                 color="secondary"
//                 value={events.filter((e) => e.packageType === "silver").length}
//               />
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// function SummaryCard({ title, color, value }) {
//   return (
//     <div className="col-md-6 col-lg-4">
//       <div className={`card text-white bg-${color} h-100 shadow`}>
//         <div className="card-body text-center">
//           <h5 className="card-title">{title}</h5>
//           <h3>{value}</h3>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllEvents,
  getUpcomingEvents,
  getPastEvents,
  deleteEvent,
  getEventsByCustomer,
} from "../services/api";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/adminlogin");
    } else {
      loadEvents();
    }
  }, [navigate, filter]);

  const loadEvents = async () => {
    setLoading(true);
    try {
      let response;
      switch (filter) {
        case "upcoming":
          response = await getUpcomingEvents();
          break;
        case "past":
          response = await getPastEvents();
          break;
        default:
          response = await getAllEvents();
      }
      setEvents(response.data.events || []);
    } catch (error) {
      console.error("Error loading events:", error);
      alert("Error loading events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(eventId);
        alert("Event deleted successfully!");
        loadEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Error deleting event. Please try again.");
      }
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadEvents();
      return;
    }

    setLoading(true);
    try {
      const response = await getEventsByCustomer(searchTerm);
      setEvents(response.data.events || []);
    } catch (error) {
      console.error("Error searching events:", error);
      alert("Error searching events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 bg-dark text-white vh-100 p-3">
          <h4>Admin Panel</h4>
          <hr />
          <div className="d-grid gap-2">
            <button
              className={`btn btn-dark ${filter === "all" ? "bg-secondary" : ""}`}
              onClick={() => setFilter("all")}
            >
              📋 All Events
            </button>
            <button
              className={`btn btn-dark ${filter === "upcoming" ? "bg-secondary" : ""}`}
              onClick={() => setFilter("upcoming")}
            >
              ⏳ Upcoming Events
            </button>
            <button
              className={`btn btn-dark ${filter === "past" ? "bg-secondary" : ""}`}
              onClick={() => setFilter("past")}
            >
              🕓 Past Events
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="col-md-10 p-4">
          <h2 className="mb-4 fw-bold">🎯 Admin Event Dashboard</h2>

          {/* Search */}
          <div className="row g-3 mb-4 align-items-end">
            <div className="col-md-6">
              <label className="form-label fw-bold">Search by Customer</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter customer name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                  className="btn btn-outline-primary"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  🔍
                </button>
              </div>
            </div>
          </div>

          {/* Events Table */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-5">
              <h4 className="text-muted">No events found</h4>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover table-bordered align-middle">
                 <thead className="table-dark text-center">
  <tr>
    <th>ID</th>
    <th>Booking Title</th>   {/* <-- Added this */}
    <th>Customer</th>
    <th>Date</th>
    <th>Package</th>
    <th>Guests</th>
    <th>Venue</th>
    <th>Amount</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  {events.map((event) => (
    <tr key={event.id} className="text-center">
      <td>{event.id}</td>
      <td>{event.bookingFormTitle || "-"}</td>   {/* <-- Added this */}
      <td>{event.customerName}</td>
      <td>{formatDate(event.eventDate)}</td>
      <td>
        <span
          className={`badge bg-${
            event.packageType === "platinum"
              ? "warning"
              : event.packageType === "gold"
              ? "info"
              : "secondary"
          }`}
        >
          {event.packageType.toUpperCase()}
        </span>
      </td>
      <td>{event.numberOfGuests}</td>
      <td>
        <small className="text-muted">{event.venueName}</small>
      </td>
      <td>{formatCurrency(event.finalAmount)}</td>
      <td>
        <span
          className={`badge bg-${
            event.bookingStatus === "CONFIRMED" ? "success" : "danger"
          }`}
        >
          {event.bookingStatus}
        </span>
      </td>
      <td>
        <div className="d-flex gap-2 justify-content-center">
          <button
            className="btn btn-sm btn-outline-info"
            onClick={() =>
              alert(`Event Details:\n${JSON.stringify(event, null, 2)}`)
            }
          >
            👁️ View
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => handleDeleteEvent(event.id)}
          >
            🗑️ Delete
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

                </table>
              </div>

              {/* Summary Cards */}
              <div className="row g-3 mt-4">
                <SummaryCard title="Total Events" color="primary" value={events.length} />
                <SummaryCard
                  title="Total Revenue"
                  color="success"
                  value={formatCurrency(
                    events.reduce((sum, e) => sum + parseFloat(e.finalAmount || 0), 0)
                  )}
                />
                <SummaryCard
                  title="Avg. Guests"
                  color="info"
                  value={Math.round(
                    events.reduce((sum, e) => sum + (e.numberOfGuests || 0), 0) / events.length
                  )}
                />
                <SummaryCard
                  title="Platinum Events"
                  color="warning"
                  value={events.filter((e) => e.packageType === "platinum").length}
                />
                <SummaryCard
                  title="Gold Events"
                  color="info"
                  value={events.filter((e) => e.packageType === "gold").length}
                />
                <SummaryCard
                  title="Silver Events"
                  color="secondary"
                  value={events.filter((e) => e.packageType === "silver").length}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, color, value }) {
  return (
    <div className="col-md-6 col-lg-4">
      <div className={`card text-white bg-${color} h-100 shadow`}>
        <div className="card-body text-center">
          <h5 className="card-title">{title}</h5>
          <h3>{value}</h3>
        </div>
      </div>
    </div>
  );
}
