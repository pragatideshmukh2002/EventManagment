package com.example.EventManagement.repository;

import com.example.EventManagement.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    
    // Check if a date is already booked
    @Query("SELECT COUNT(e) > 0 FROM Event e WHERE e.eventDate = :eventDate AND e.bookingStatus = 'CONFIRMED'")
    boolean existsByEventDate(@Param("eventDate") LocalDate eventDate);
    
    // Find all events on a specific date
    List<Event> findByEventDate(LocalDate eventDate);
    
    // Find all confirmed events on a specific date
    List<Event> findByEventDateAndBookingStatus(LocalDate eventDate, String bookingStatus);
    
    // Find all events for a customer by name
    List<Event> findByCustomerNameOrderByEventDateDesc(String customerName);
    
    // Find all events for a customer by email
    List<Event> findByCustomerEmailOrderByEventDateDesc(String customerEmail);
    
    // Find all events for a customer by email (including null/empty emails)
    @Query("SELECT e FROM Event e WHERE (e.customerEmail = :customerEmail OR e.customerEmail IS NULL OR e.customerEmail = '') ORDER BY e.eventDate DESC")
    List<Event> findByCustomerEmailOrNullOrderByEventDateDesc(@Param("customerEmail") String customerEmail);
    
    // Find all events within a date range
    @Query("SELECT e FROM Event e WHERE e.eventDate BETWEEN :startDate AND :endDate ORDER BY e.eventDate")
    List<Event> findEventsInDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    // Find all upcoming events
    @Query("SELECT e FROM Event e WHERE e.eventDate >= :today ORDER BY e.eventDate")
    List<Event> findUpcomingEvents(@Param("today") LocalDate today);
    
    // Find all past events
    @Query("SELECT e FROM Event e WHERE e.eventDate < :today ORDER BY e.eventDate DESC")
    List<Event> findPastEvents(@Param("today") LocalDate today);
} 