import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored || stored === "undefined") return null; // ⛔ prevent crash
      return JSON.parse(stored);
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
      localStorage.removeItem("user");
      return null;
    }
  });

  const login = (userObj) => {
    localStorage.setItem("user", JSON.stringify(userObj));
    setUser(userObj);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
