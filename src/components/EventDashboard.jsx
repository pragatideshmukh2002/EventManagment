// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // ⬅️ Import navigate
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

//   // 🔐 Admin access check
// useEffect(() => {
//   const adminToken = localStorage.getItem("adminToken");
//   if (!adminToken) {
//     navigate("/admin/login");
//   }
// }, [navigate]);


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
//       <h2 className="text-center mb-4 fw-bold">
//         📊 Event Management Dashboard
//       </h2>

//       {/* Filters and Search */}
//       <div className="row mb-4">
//         <div className="col-md-6">
//           <div className="d-flex gap-2">
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
//               className="btn btn-primary"
//               onClick={loadEvents}
//               disabled={loading}
//             >
//               {loading ? "⏳" : "🔄"}
//             </button>
//           </div>
//         </div>
//         <div className="col-md-6">
//           <div className="d-flex gap-2">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by customer name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               onKeyPress={(e) => e.key === "Enter" && handleSearch()}
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
//           <div className="spinner-border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       ) : events.length === 0 ? (
//         <div className="text-center py-5">
//           <h4 className="text-muted">No events found</h4>
//         </div>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-striped table-hover">
//             <thead className="table-dark">
//               <tr>
//                 <th>ID</th>
//                 <th>Customer</th>
//                 <th>Event Date</th>
//                 <th>Package</th>
//                 <th>Guests</th>
//                 <th>Venue</th>
//                 <th>Final Amount</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {events.map((event) => (
//                 <tr key={event.id}>
//                   <td>{event.id}</td>
//                   <td>{event.customerName}</td>
//                   <td>{formatDate(event.eventDate)}</td>
//                   <td>
//                     <span
//                       className={`badge bg-${
//                         event.packageType === "platinum"
//                           ? "warning"
//                           : event.packageType === "gold"
//                           ? "info"
//                           : "secondary"
//                       }`}
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
//                       className={`badge bg-${
//                         event.bookingStatus === "CONFIRMED"
//                           ? "success"
//                           : "warning"
//                       }`}
//                     >
//                       {event.bookingStatus}
//                     </span>
//                   </td>
//                   <td>
//                     <div className="btn-group btn-group-sm">
//                       <button
//                         className="btn btn-outline-info"
//                         onClick={() =>
//                           alert(
//                             `Event Details:\n${JSON.stringify(event, null, 2)}`
//                           )
//                         }
//                         title="View Details"
//                       >
//                         👁️
//                       </button>
//                       <button
//                         className="btn btn-outline-danger"
//                         onClick={() => handleDeleteEvent(event.id)}
//                         title="Delete Event"
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

//       {/* Summary Stats */}
//       {events.length > 0 && (
//         <div className="row mt-4">
//           <div className="col-md-3">
//             <div className="card bg-primary text-white">
//               <div className="card-body text-center">
//                 <h5 className="card-title">Total Events</h5>
//                 <h3>{events.length}</h3>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-3">
//             <div className="card bg-success text-white">
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
//           <div className="col-md-3">
//             <div className="card bg-info text-white">
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
//           <div className="col-md-3">
//             <div className="card bg-warning text-white">
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
//         </div>
//       )}
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

export default function EventDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Admin access check
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
    }
  }, [navigate]);

  useEffect(() => {
    loadEvents();
  }, [filter]);

  const loadEvents = async () => {
    setLoading(true);
    const adminToken = localStorage.getItem("adminToken"); // Get token here
    try {
      let response;
      switch (filter) {
        case "upcoming":
          response = await getUpcomingEvents(adminToken);
          break;
        case "past":
          response = await getPastEvents(adminToken);
          break;
        default:
          response = await getAllEvents(adminToken);
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
      const adminToken = localStorage.getItem("adminToken"); // Pass token here
      try {
        await deleteEvent(eventId, adminToken);
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
    const adminToken = localStorage.getItem("adminToken"); // Pass token here
    try {
      const response = await getEventsByCustomer(searchTerm, adminToken);
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
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">📊 Event Management Dashboard</h2>

      {/* Filters and Search */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="d-flex gap-2">
            <select
              className="form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Events</option>
              <option value="upcoming">Upcoming Events</option>
              <option value="past">Past Events</option>
            </select>
            <button
              className="btn btn-primary"
              onClick={loadEvents}
              disabled={loading}
            >
              {loading ? "⏳" : "🔄"}
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search by customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
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
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">No events found</h4>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Event Date</th>
                <th>Package</th>
                <th>Guests</th>
                <th>Venue</th>
                <th>Final Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.id}</td>
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
                        event.bookingStatus === "CONFIRMED" ? "success" : "warning"
                      }`}
                    >
                      {event.bookingStatus}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-outline-info"
                        onClick={() =>
                          alert(`Event Details:\n${JSON.stringify(event, null, 2)}`)
                        }
                        title="View Details"
                      >
                        👁️
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDeleteEvent(event.id)}
                        title="Delete Event"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary Stats */}
      {events.length > 0 && (
        <div className="row mt-4">
          <div className="col-md-3">
            <div className="card bg-primary text-white">
              <div className="card-body text-center">
                <h5 className="card-title">Total Events</h5>
                <h3>{events.length}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-success text-white">
              <div className="card-body text-center">
                <h5 className="card-title">Total Revenue</h5>
                <h3>
                  {formatCurrency(
                    events.reduce(
                      (sum, event) => sum + parseFloat(event.finalAmount || 0),
                      0
                    )
                  )}
                </h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-info text-white">
              <div className="card-body text-center">
                <h5 className="card-title">Avg. Guests</h5>
                <h3>
                  {Math.round(
                    events.reduce(
                      (sum, event) => sum + (event.numberOfGuests || 0),
                      0
                    ) / events.length
                  )}
                </h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-warning text-white">
              <div className="card-body text-center">
                <h5 className="card-title">Platinum Events</h5>
                <h3>
                  {
                    events.filter((event) => event.packageType === "platinum")
                      .length
                  }
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

