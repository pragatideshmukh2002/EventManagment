package com.example.EventManagement.entity;

import jakarta.persistence.*;

@Entity // Marks this class as a JPA entity to be mapped to a database table
@Table(name = "users") // Specifies the name of the table in the database
public class User {

    @Id // Marks the primary key field
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generates the ID (usually auto-increment in DB)
    private Long id;

    // Fields mapped to columns in the "users" table
    private String firstName;
    private String lastName;
    private String contactNumber;
    private String email;
    private String address;
    private String password;
    private String role = "user"; // Default role is user
    private java.time.LocalDateTime createdAt;

    // Getters and Setters for each field

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id; // Sets the user ID
    }

    public String getFirstName() {
        return firstName; // Returns the first name
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName; // Sets the first name
    }

    public String getLastName() {
        return lastName; // Returns the last name
    }

    public void setLastName(String lastName) {
        this.lastName = lastName; // Sets the last name
    }

    public String getContactNumber() {
        return contactNumber; // Returns the contact number
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber; // Sets the contact number
    }

    public String getEmail() {
        return email; // Returns the email
    }

    public void setEmail(String email) {
        this.email = email; // Sets the email
    }

    public String getAddress() {
        return address; // Returns the address
    }

    public void setAddress(String address) {
        this.address = address; // Sets the address
    }

    public String getPassword() {
        return password; // Returns the password
    }

    public void setPassword(String password) {
        this.password = password; // Sets the password
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public java.time.LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(java.time.LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
