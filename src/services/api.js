import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:7777/api" });

export const registerUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);
export const getEvents = () => API.get("/events");
export const createEvent = (data) => API.post("/events", data);
export const bookEvent = (data) => API.post("/bookings", data);