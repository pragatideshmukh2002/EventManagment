import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (!stored || stored === "undefined" || !token) return null;
      return JSON.parse(stored);
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const login = (userObj, authToken) => {
    localStorage.setItem("user", JSON.stringify(userObj));
    localStorage.setItem("token", authToken);
    setUser(userObj);
    setToken(authToken);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  // Check if token is valid on app load
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const response = await fetch('http://localhost:7777/api/users/validate-token', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (!response.ok) {
            logout();
          }
        } catch (error) {
          console.error('Token validation error:', error);
          logout();
        }
      }
    };

    validateToken();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
