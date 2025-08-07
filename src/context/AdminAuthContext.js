// import React, { createContext, useState, useEffect } from "react";

// export const AdminAuthContext = createContext();

// export const AdminAuthProvider = ({ children }) => {
//     const [admin, setAdmin] = useState(null);

//     useEffect(() => {
//         const storedAdmin = localStorage.getItem("admin");
//         if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
//     }, []);

//     const login = (adminData) => {
//         setAdmin(adminData);
//         localStorage.setItem("admin", JSON.stringify(adminData));
//     };

//     const logout = () => {
//         setAdmin(null);
//         localStorage.removeItem("admin");
//     };

//     return (
//         <AdminAuthContext.Provider value={{ admin, login, logout }}>
//             {children}
//         </AdminAuthContext.Provider>
//     );
// };
