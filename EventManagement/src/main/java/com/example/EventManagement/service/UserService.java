package com.example.EventManagement.service;

import com.example.EventManagement.entity.User;
import com.example.EventManagement.repository.UserRepository;
import com.example.EventManagement.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    // Method to register a new user and save to the database
    public User register(User user) {
        // Check if user already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User with this email already exists");
        }
        
        // Encode password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // Set default role if not provided
        if (user.getRole() == null) {
            user.setRole("user");
        }
        
        // Set creation timestamp
        user.setCreatedAt(java.time.LocalDateTime.now());
        
        return userRepository.save(user);
    }

    // Method to authenticate a user using email and password
    public Map<String, Object> login(String email, String password) {
        try {
            // Authenticate using Spring Security
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
            );

            // Load user details
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            
            // Generate JWT token
            String token = jwtUtil.generateToken(userDetails.getUsername());
            
            // Get user from database
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Create response
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("token", token);
            response.put("user", user);
            
            return response;
        } catch (Exception e) {
            throw new RuntimeException("Invalid credentials");
        }
    }

    // Method to validate token
    public boolean validateToken(String token) {
        try {
            String username = jwtUtil.extractUsername(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            return jwtUtil.validateToken(token, userDetails.getUsername());
        } catch (Exception e) {
            return false;
        }
    }

    // Method to get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Method to delete a user
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Prevent deletion of admin users
        if ("admin".equals(user.getRole())) {
            throw new RuntimeException("Cannot delete admin users");
        }
        
        userRepository.deleteById(id);
    }

    // Method to create an admin user (for testing)
    public User createAdminUser(String email, String password, String firstName, String lastName) {
        User adminUser = new User();
        adminUser.setEmail(email);
        adminUser.setPassword(password);
        adminUser.setFirstName(firstName);
        adminUser.setLastName(lastName);
        adminUser.setRole("admin");
        adminUser.setCreatedAt(java.time.LocalDateTime.now());
        
        // Encode password
        adminUser.setPassword(passwordEncoder.encode(adminUser.getPassword()));
        
        return userRepository.save(adminUser);
    }
}
