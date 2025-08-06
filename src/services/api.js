import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:7777/api" });

// Add a request interceptor to include JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired, clear local storage and redirect to login
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login";
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
export const getAllEvents = () => API.get("/events"); // Alias for getEvents
export const getEventById = (id) => API.get(`/events/${id}`);
export const getEventsByCustomer = (customerName) =>
  API.get(`/events/customer/${customerName}`);
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

// Legacy endpoints (keeping for backward compatibility)
export const bookEvent = (data) => API.post("/bookings", data);
