package com.example.EventManagement.service;

import com.example.EventManagement.entity.User;
import com.example.EventManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service  // Marks this class as a service component in Spring
public class UserService {

    @Autowired  // Automatically injects the UserRepository dependency
    private UserRepository userRepository;

    // Method to register a new user and save to the database
    public User register(User user) {
        return userRepository.save(user);
    }

    // Method to authenticate a user using email and password
    public User login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(u -> u.getPassword().equals(password)) // checks if password matches
                .orElse(null); // returns null if user not found or password mismatch
    }
}
