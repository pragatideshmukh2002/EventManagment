# Event Management System - Authentication Implementation

## Overview

This document describes the comprehensive authentication system implemented for the Event Management application, ensuring secure access to protected routes and API endpoints.

## Features Implemented

### 1. Frontend Authentication (React)

#### Protected Routes

- **ProtectedRoute Component**: Wraps components that require authentication
- **Automatic Redirect**: Unauthenticated users are redirected to login page
- **State Preservation**: Remembers the intended destination after login

#### Authentication Context

- **AuthContext**: Manages authentication state across the application
- **JWT Token Storage**: Securely stores tokens in localStorage
- **Token Validation**: Validates tokens on app load and API calls
- **Automatic Logout**: Handles token expiration and invalid tokens

#### Components Updated

- **Login.jsx**: Enhanced with JWT token handling and proper redirects
- **Register.jsx**: Updated to handle new API response format
- **Eventcards.jsx**: Uses AuthContext instead of direct localStorage access
- **Navbar.js**: Already had logout functionality, now integrated with AuthContext

### 2. Backend Authentication (Spring Boot)

#### JWT Implementation

- **JwtUtil**: Handles token generation, validation, and extraction
- **JwtAuthenticationFilter**: Intercepts requests and validates tokens
- **SecurityConfig**: Configures Spring Security with JWT authentication

#### Security Features

- **Password Encryption**: BCrypt password hashing
- **Token-based Authentication**: Stateless JWT authentication
- **Protected Endpoints**: All API endpoints except login/register require authentication
- **CORS Configuration**: Proper CORS setup for frontend integration

#### API Endpoints

- **POST /api/users/register**: User registration with password encryption
- **POST /api/users/login**: User authentication with JWT token generation
- **GET /api/users/validate-token**: Token validation endpoint
- **Protected Endpoints**: All other endpoints require valid JWT token

## Security Measures

### Frontend Security

1. **Route Protection**: Unauthenticated users cannot access protected pages
2. **Token Management**: Secure token storage and automatic cleanup
3. **API Interceptors**: Automatic token inclusion in API requests
4. **Error Handling**: Proper handling of authentication errors

### Backend Security

1. **Password Hashing**: BCrypt encryption for stored passwords
2. **JWT Tokens**: Secure, stateless authentication
3. **Request Filtering**: All requests validated for valid tokens
4. **CORS Protection**: Proper cross-origin request handling

## How It Works

### Authentication Flow

1. **User Registration**: Password is encrypted before storage
2. **User Login**: Credentials validated, JWT token generated
3. **Token Storage**: Token stored in localStorage with user data
4. **API Requests**: Token automatically included in request headers
5. **Route Protection**: Protected routes check authentication status
6. **Token Validation**: Backend validates tokens on each request

### Protected Route Flow

1. **Direct URL Access**: User tries to access `/events` directly
2. **Authentication Check**: ProtectedRoute checks if user is logged in
3. **Redirect**: If not authenticated, redirects to login with return URL
4. **Login Success**: After successful login, redirects to original destination

### API Protection Flow

1. **Request Made**: Frontend makes API call to protected endpoint
2. **Token Inclusion**: JWT token automatically included in request header
3. **Backend Validation**: JwtAuthenticationFilter validates token
4. **Response**: If valid, request proceeds; if invalid, 401 error returned
5. **Frontend Handling**: 401 errors trigger automatic logout and redirect

## Testing the Implementation

### Test Scenarios

1. **Unauthenticated Access to Events Page**

   - Try accessing `http://localhost:3000/events` without logging in
   - Should redirect to login page
   - After login, should redirect back to events page

2. **Direct API Access**

   - Try accessing `http://localhost:7777/api/events` without token
   - Should return 401 Unauthorized

3. **Token Expiration**

   - Login and get a token
   - Wait for token expiration (24 hours) or manually expire
   - API calls should return 401 and trigger logout

4. **Protected Route Navigation**
   - Login and navigate to events page
   - Try accessing event form directly
   - Should work without redirect

### Manual Testing Steps

1. **Start the Application**

   ```bash
   # Backend (Terminal 1)
   cd EventManagement
   ./mvnw spring-boot:run

   # Frontend (Terminal 2)
   npm start
   ```

2. **Test Registration**

   - Go to `http://localhost:3000/register`
   - Create a new account
   - Should redirect to login page

3. **Test Login**

   - Login with created credentials
   - Should redirect to events page
   - Check browser dev tools for JWT token in localStorage

4. **Test Protected Routes**

   - Try accessing `http://localhost:3000/events` directly without login
   - Should redirect to login page
   - After login, should redirect back to events

5. **Test API Protection**
   - Use browser dev tools or Postman
   - Try accessing `http://localhost:7777/api/events` without Authorization header
   - Should return 401 Unauthorized

## Configuration Files

### Frontend Configuration

- `src/context/AuthContext.jsx`: Authentication state management
- `src/components/ProtectedRoute.jsx`: Route protection component
- `src/services/api.js`: API service with JWT interceptors
- `src/App.js`: Updated with AuthProvider and ProtectedRoute

### Backend Configuration

- `EventManagement/src/main/java/com/example/EventManagement/config/SecurityConfig.java`: Spring Security configuration
- `EventManagement/src/main/java/com/example/EventManagement/config/JwtAuthenticationFilter.java`: JWT filter
- `EventManagement/src/main/java/com/example/EventManagement/util/JwtUtil.java`: JWT utility class
- `EventManagement/src/main/java/com/example/EventManagement/service/CustomUserDetailsService.java`: User details service

## Dependencies Added

### Frontend Dependencies

- No new dependencies required (using existing React Router and Axios)

### Backend Dependencies

- `spring-boot-starter-security`: Spring Security
- `jjwt-api`, `jjwt-impl`, `jjwt-jackson`: JWT library

## Security Best Practices Implemented

1. **Password Security**: BCrypt hashing for password storage
2. **Token Security**: JWT tokens with expiration
3. **Route Protection**: Client-side and server-side protection
4. **Error Handling**: Proper error responses and user feedback
5. **CORS Configuration**: Secure cross-origin request handling
6. **Token Validation**: Automatic token validation on app load
7. **Automatic Logout**: Handling of expired/invalid tokens

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS configuration matches frontend URL
2. **Token Not Sent**: Check API interceptors in `src/services/api.js`
3. **Login Not Working**: Verify backend is running on port 7777
4. **Protected Routes Not Working**: Check AuthProvider is wrapping the app

### Debug Steps

1. **Check Browser Console**: Look for authentication errors
2. **Check Network Tab**: Verify JWT token in request headers
3. **Check localStorage**: Verify token and user data are stored
4. **Check Backend Logs**: Look for authentication filter logs

## Future Enhancements

1. **Refresh Tokens**: Implement refresh token mechanism
2. **Role-based Access**: Add user roles and permissions
3. **Session Management**: Implement session tracking
4. **Security Headers**: Add security headers to responses
5. **Rate Limiting**: Implement API rate limiting
6. **Audit Logging**: Add authentication event logging
