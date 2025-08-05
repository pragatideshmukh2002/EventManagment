package com.example.EventManagement.repository;

import com.example.EventManagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// This interface acts as a repository for User entity
public interface UserRepository extends JpaRepository<User, Long> {

    // Custom method to find a user by their email
    Optional<User> findByEmail(String email);
}
