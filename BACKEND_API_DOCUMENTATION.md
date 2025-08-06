# Event Management Backend API Documentation

## Overview

This document describes the REST API endpoints for the Event Management System backend, built with Spring Boot.

## Base URL

```
http://localhost:7777/api
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Event Management Endpoints

### 1. Check Date Availability

**GET** `/events/check-date/{date}`

Check if a specific date is available for booking.

**Parameters:**

- `date` (path parameter): Date in YYYY-MM-DD format

**Response:**

```json
{
  "date": "2024-01-15",
  "available": true,
  "message": "This date is available for booking."
}
```

### 2. Create Event Booking

**POST** `/events/book`

Create a new event booking.

**Request Body:**

```json
{
  "customerName": "John Doe",
  "eventDate": "2024-01-15",
  "packageType": "silver",
  "numberOfGuests": 150,
  "venueName": "Grand Hotel",
  "venueAddress": "123 Main Street, City",
  "decoration": "Traditional",
  "cateringRequired": "yes",
  "cateringType": "veg",
  "menuType": "basic",
  "advanceAmount": 50000
}
```

**Response:**

```json
{
  "success": true,
  "message": "Event booked successfully!",
  "event": {
    "id": 1,
    "customerName": "John Doe",
    "eventDate": "2024-01-15",
    "packageType": "silver",
    "numberOfGuests": 150,
    "totalAmount": 100000.0,
    "finalAmount": 118000.0,
    "advanceAmount": 50000.0,
    "balanceAmount": 68000.0,
    "bookingStatus": "CONFIRMED"
  }
}
```

### 3. Get All Events

**GET** `/events`

Retrieve all events.

**Response:**

```json
{
  "success": true,
  "events": [...],
  "count": 5
}
```

### 4. Get Event by ID

**GET** `/events/{id}`

Retrieve a specific event by ID.

**Response:**

```json
{
  "success": true,
  "event": {
    "id": 1,
    "customerName": "John Doe",
    "eventDate": "2024-01-15",
    ...
  }
}
```

### 5. Get Events by Customer

**GET** `/events/customer/{customerName}`

Retrieve all events for a specific customer.

**Response:**

```json
{
  "success": true,
  "events": [...],
  "count": 2
}
```

### 6. Get Upcoming Events

**GET** `/events/upcoming`

Retrieve all upcoming events (from today onwards).

**Response:**

```json
{
  "success": true,
  "events": [...],
  "count": 3
}
```

### 7. Get Past Events

**GET** `/events/past`

Retrieve all past events (before today).

**Response:**

```json
{
  "success": true,
  "events": [...],
  "count": 2
}
```

### 8. Update Event

**PUT** `/events/{id}`

Update an existing event.

**Request Body:** Same as create event
**Response:** Same as create event

### 9. Delete Event

**DELETE** `/events/{id}`

Delete an event.

**Response:**

```json
{
  "success": true,
  "message": "Event deleted successfully!"
}
```

### 10. Calculate Event Amounts

**POST** `/events/calculate`

Calculate amounts for an event without saving it.

**Request Body:** Same as create event
**Response:** Same as create event

### 11. Get Available Dates

**GET** `/events/available-dates`

Get all available dates in a date range.

**Query Parameters:**

- `startDate`: Start date in YYYY-MM-DD format
- `endDate`: End date in YYYY-MM-DD format

**Response:**

```json
{
  "success": true,
  "availableDates": ["2024-01-15", "2024-01-16", "2024-01-17"],
  "count": 3
}
```

## User Management Endpoints

### 1. User Registration

**POST** `/users/register`

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "contactNumber": "1234567890",
  "address": "123 Main Street"
}
```

### 2. User Login

**POST** `/users/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

### 3. Validate Token

**GET** `/users/validate-token`

Validate the current JWT token.

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "This date is already booked. Please choose another date."
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Event not found"
}
```

## Business Rules

### Event Booking Rules

1. **Minimum Guests**: At least 100 guests required
2. **Date Availability**: Only one event per date allowed
3. **Package Types**: silver, gold, platinum
4. **Catering Options**:
   - Veg: Basic (₹600/guest), Full (₹900/guest)
   - Non-Veg: Basic (₹800/guest), Full (₹1200/guest)

### Package Pricing

- **Silver**: Base ₹100,000 (up to 200 guests), Extra ₹40,000 per 200 guests
- **Gold**: Base ₹150,000 (up to 200 guests), Extra ₹25,000 per 200 guests
- **Platinum**: Base ₹200,000 (up to 200 guests), Extra ₹25,000 per 200 guests

### Tax Calculation

- 18% GST on total amount

## Database Schema

### Events Table

```sql
CREATE TABLE events (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(255),
    event_date DATE NOT NULL,
    package_type VARCHAR(50),
    number_of_guests INTEGER,
    venue_name VARCHAR(255),
    venue_address TEXT,
    decoration VARCHAR(100),
    catering_required VARCHAR(10),
    catering_type VARCHAR(50),
    menu_type VARCHAR(50),
    total_amount DECIMAL(10,2),
    final_amount DECIMAL(10,2),
    advance_amount DECIMAL(10,2),
    balance_amount DECIMAL(10,2),
    created_at DATE,
    booking_status VARCHAR(20) DEFAULT 'CONFIRMED'
);
```

### Users Table

```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    contact_number VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    password VARCHAR(255)
);
```

## Frontend Integration

The frontend React application integrates with these endpoints through the `api.js` service file, which provides functions for all the above operations.

### Key Frontend Features

1. **Real-time Date Availability Checking**: Automatically checks date availability when user selects a date
2. **Amount Calculation**: Calculates package and catering costs with tax
3. **Form Validation**: Ensures minimum guest requirements and date availability
4. **Admin Dashboard**: View, filter, and manage all events
5. **Search Functionality**: Search events by customer name

## Running the Application

1. **Backend**: Start the Spring Boot application on port 7777
2. **Frontend**: Start the React application on port 3000
3. **Database**: Ensure MySQL/H2 database is running and configured

The system provides a complete event management solution with date availability checking, automatic pricing calculation, and comprehensive admin features.
