package com.example.EventManagement.controller;

import com.example.EventManagement.entity.User;
import com.example.EventManagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController // Marks this class as a REST controller
@RequestMapping("/api/users") // Base path for all user-related endpoints
@CrossOrigin(origins = "http://localhost:3000") // Allows requests from React frontend running on localhost:3000
public class UserController {

    @Autowired // Automatically injects the UserService bean
    private UserService userService;

    @PostMapping("/register") // Handles POST requests to /api/users/register
    public String register(@RequestBody User user) {
        userService.register(user); // Calls the service to save the user
        return "User registered successfully"; // Sends success message
    }

    @PostMapping("/login") // Handles POST requests to /api/users/login
    public Object login(@RequestBody User user) {
        String email = user.getEmail();       // Extracts email from request body
        String password = user.getPassword(); // Extracts password from request body

        User u = userService.login(email, password); // Calls service to validate credentials
        if (u == null) {
            return "Invalid credentials"; // If user not found or password mismatch
        }

        // Returns anonymous object with message and user data
        return new Object() {
            public final String message = "Login successful"; // Login status message
            public final User user = u; // Authenticated user info
        };
    }

}
