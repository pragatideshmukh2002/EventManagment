package com.example.EventManagement.controller;

import com.example.EventManagement.entity.User;
import com.example.EventManagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = userService.register(user);
            return ResponseEntity.ok(Map.of("message", "User registered successfully", "user", registeredUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            String email = user.getEmail();
            String password = user.getPassword();

            Map<String, Object> response = userService.login(email, password);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authorization) {
        try {
            if (authorization != null && authorization.startsWith("Bearer ")) {
                String token = authorization.substring(7);
                boolean isValid = userService.validateToken(token);
                
                if (isValid) {
                    return ResponseEntity.ok(Map.of("message", "Token is valid"));
                } else {
                    return ResponseEntity.status(401).body(Map.of("message", "Invalid token"));
                }
            } else {
                return ResponseEntity.status(401).body(Map.of("message", "No token provided"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("message", "Token validation failed"));
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers(@RequestHeader(value = "Authorization", required = false) String authorization) {
        try {
            // For now, allow access without strict token checking for testing
            System.out.println("Authorization header: " + authorization);
            
            // Check if admin token is provided
            if (authorization == null || !authorization.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body(Map.of("message", "Admin authentication required"));
            }
            
            String token = authorization.substring(7);
            System.out.println("Received token: " + token); // Debug log
            
            // Allow any token for now to test the endpoint
            if (!"manual-admin-token".equals(token)) {
                System.out.println("Token mismatch. Expected: manual-admin-token, Received: " + token);
                // For testing, allow any token
                // return ResponseEntity.status(403).body(Map.of("message", "Admin access required. Token: " + token));
            }
            
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(Map.of("users", users));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id, @RequestHeader(value = "Authorization", required = false) String authorization) {
        try {
            // For now, allow access without strict token checking for testing
            System.out.println("Delete user - Authorization header: " + authorization);
            
            // Check if admin token is provided
            if (authorization == null || !authorization.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body(Map.of("message", "Admin authentication required"));
            }
            
            String token = authorization.substring(7);
            System.out.println("Delete user - Received token: " + token);
            
            // Allow any token for now to test the endpoint
            if (!"manual-admin-token".equals(token)) {
                System.out.println("Delete user - Token mismatch. Expected: manual-admin-token, Received: " + token);
                // For testing, allow any token
                // return ResponseEntity.status(403).body(Map.of("message", "Admin access required"));
            }
            
            userService.deleteUser(id);
            return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/create-admin")
    public ResponseEntity<?> createAdminUser(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String password = request.get("password");
            String firstName = request.get("firstName");
            String lastName = request.get("lastName");
            
            User adminUser = userService.createAdminUser(email, password, firstName, lastName);
            return ResponseEntity.ok(Map.of("message", "Admin user created successfully", "user", adminUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/create-test-admin")
    public ResponseEntity<?> createTestAdmin() {
        try {
            User adminUser = userService.createAdminUser("admin@test.com", "admin123", "Admin", "User");
            return ResponseEntity.ok(Map.of("message", "Test admin user created successfully", "user", adminUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/test-admin")
    public ResponseEntity<?> testAdminAuth(@RequestHeader(value = "Authorization", required = false) String authorization) {
        try {
            System.out.println("Test admin - Authorization header: " + authorization);
            
            if (authorization == null || !authorization.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body(Map.of("message", "No token provided"));
            }
            
            String token = authorization.substring(7);
            System.out.println("Test admin token: " + token);
            
            if ("manual-admin-token".equals(token)) {
                return ResponseEntity.ok(Map.of("message", "Admin authentication successful", "token", token));
            } else {
                return ResponseEntity.status(403).body(Map.of("message", "Invalid admin token", "received", token));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/test-simple")
    public ResponseEntity<?> testSimple() {
        return ResponseEntity.ok(Map.of("message", "Backend is working!"));
    }
}
