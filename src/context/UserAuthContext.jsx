// // src/context/UserAuthContext.js
// import React, { createContext, useState, useEffect } from "react";

// export const UserAuthContext = createContext();

// export const UserAuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         }
//     }, []);

//     const login = (userData) => {
//         setUser(userData);
//         localStorage.setItem("user", JSON.stringify(userData));
//     };

//     const logout = () => {
//         setUser(null);
//         localStorage.removeItem("user");
//     };

//     return (
//         <UserAuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </UserAuthContext.Provider>
//     );
// };
// src/context/UserAuthContext.js
import React, { createContext, useState } from "react";

export const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
    // LocalStorage se initial user state set karo
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        if (token) {
            localStorage.setItem("token", token);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <UserAuthContext.Provider value={{ user, login, logout }}>
            {children}
        </UserAuthContext.Provider>
    );
};

