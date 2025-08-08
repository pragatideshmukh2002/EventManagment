import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:7777/api" });

// Include JWT token only if caller didn't already set an Authorization header
API.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    const token = localStorage.getItem("token");
    if (!config.headers.Authorization && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global 401 handling for user token expiry
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      // Keep adminToken intact; only clear user token
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// User authentication endpoints
export const registerUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);
export const validateToken = () => API.get("/users/validate-token");

// Event management endpoints
export const getEvents = () => API.get("/events");
export const getAllEvents = () => API.get("/events");
export const getEventById = (id) => API.get(`/events/${id}`);
export const getEventsByCustomer = (customerName) =>
  API.get(`/events/customer/${customerName}`);

export const getEventsByCustomerEmail = (customerEmail) =>
  API.get(`/events/customer-email/${customerEmail}`);
export const getUpcomingEvents = () => API.get("/events/upcoming");
export const getPastEvents = () => API.get("/events/past");
export const createEvent = (data) => API.post("/events/book", data);
export const updateEvent = (id, data) => API.put(`/events/${id}`, data);
export const deleteEvent = (id) => API.delete(`/events/${id}`);
export const calculateEventAmounts = (data) =>
  API.post("/events/calculate", data);

// Date availability endpoints
export const checkDateAvailability = (date) =>
  API.get(`/events/check-date/${date}`);
export const getAvailableDates = (startDate, endDate) =>
  API.get(`/events/available-dates?startDate=${startDate}&endDate=${endDate}`);

// Admin endpoints (use separate admin token that AdminLogin sets)
export const getAllUsers = () => {
  const adminToken = localStorage.getItem("adminToken");
  return API.get("/users", {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
};

export const deleteUser = (id) => {
  const adminToken = localStorage.getItem("adminToken");
  return API.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
};

export const testAdminAuth = () => {
  const adminToken = localStorage.getItem("adminToken");
  return API.get("/users/test-admin", {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
};

export const createTestAdmin = () => API.post("/users/create-test-admin");

export const testSimple = () => API.get("/users/test-simple");

// Legacy endpoints (keeping for backward compatibility)
export const bookEvent = (data) => API.post("/bookings", data);
