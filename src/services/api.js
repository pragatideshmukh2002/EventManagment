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

export const registerUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);
export const validateToken = () => API.get("/users/validate-token");
export const getEvents = () => API.get("/events");
export const createEvent = (data) => API.post("/events", data);
export const bookEvent = (data) => API.post("/bookings", data);
