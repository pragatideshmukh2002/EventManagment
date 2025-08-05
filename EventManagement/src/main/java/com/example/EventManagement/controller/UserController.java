package com.example.EventManagement.controller;

import com.example.EventManagement.entity.User;
import com.example.EventManagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
