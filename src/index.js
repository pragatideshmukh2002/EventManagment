// // src/index.js
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import { AuthProvider } from './context/AuthContext'; // ✅

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <AuthProvider> {/* ✅ Wrap your app here */}
//       <App />
//     </AuthProvider>
//   </React.StrictMode>
// );

// reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/js/bootstrap.bundle.min";

// Import both contexts
import { AuthProvider } from './context/AuthContext'; // Admin context
import { UserAuthProvider } from './context/UserAuthContext'; // User context

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> 
      <UserAuthProvider> 
        <App />
      </UserAuthProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
