import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserAuthContext } from "../context/UserAuthContext";

export default function UserProtectedRoute({ children }) {
  const { user } = useContext(UserAuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}


