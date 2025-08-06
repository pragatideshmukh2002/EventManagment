import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Eventcards from "./components/Eventcards";
import EventForm from "./components/EventForm";
import EventDashboard from "./components/EventDashboard";
import About from "./components/About";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100">
        <BrowserRouter>
          <Navbar />
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/events"
                element={
                  <ProtectedRoute>
                    <Eventcards />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/event-form/:type"
                element={
                  <ProtectedRoute>
                    <EventForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <EventDashboard />
                  </ProtectedRoute>
                }
              />
         
              <Route path="/register" element={<Register />} />
              
              <Route path="/admin/login" element={<AdminLogin/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </div>
          {/* <Footer /> */}
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
