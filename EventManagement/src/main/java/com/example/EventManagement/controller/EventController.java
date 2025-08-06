package com.example.EventManagement.controller;

import com.example.EventManagement.entity.Event;
import com.example.EventManagement.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {

    @Autowired
    private EventService eventService;

    // Check date availability
    @GetMapping("/check-date/{date}")
    public ResponseEntity<?> checkDateAvailability(@PathVariable String date) {
        try {
            LocalDate eventDate = LocalDate.parse(date);
            Map<String, Object> result = eventService.checkDateAvailability(eventDate);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Invalid date format. Please use YYYY-MM-DD format."
            ));
        }
    }

    // Create new event booking
    @PostMapping("/book")
    public ResponseEntity<?> createEvent(@RequestBody Event event) {
        Map<String, Object> result = eventService.createEvent(event);
        
        if ((Boolean) result.get("success")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    // Get all events
    @GetMapping
    public ResponseEntity<?> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(Map.of(
            "success", true,
            "events", events,
            "count", events.size()
        ));
    }

    // Get event by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getEventById(@PathVariable Long id) {
        Event event = eventService.getEventById(id);
        if (event != null) {
            return ResponseEntity.ok(Map.of(
                "success", true,
                "event", event
            ));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get events by customer name
    @GetMapping("/customer/{customerName}")
    public ResponseEntity<?> getEventsByCustomer(@PathVariable String customerName) {
        List<Event> events = eventService.getEventsByCustomer(customerName);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "events", events,
            "count", events.size()
        ));
    }

    // Get upcoming events
    @GetMapping("/upcoming")
    public ResponseEntity<?> getUpcomingEvents() {
        List<Event> events = eventService.getUpcomingEvents();
        return ResponseEntity.ok(Map.of(
            "success", true,
            "events", events,
            "count", events.size()
        ));
    }

    // Get past events
    @GetMapping("/past")
    public ResponseEntity<?> getPastEvents() {
        List<Event> events = eventService.getPastEvents();
        return ResponseEntity.ok(Map.of(
            "success", true,
            "events", events,
            "count", events.size()
        ));
    }

    // Update event
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        Map<String, Object> result = eventService.updateEvent(id, event);
        
        if ((Boolean) result.get("success")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    // Delete event
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        Map<String, Object> result = eventService.deleteEvent(id);
        
        if ((Boolean) result.get("success")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    // Calculate amounts for an event (without saving)
    @PostMapping("/calculate")
    public ResponseEntity<?> calculateAmounts(@RequestBody Event event) {
        eventService.calculateEventAmounts(event);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "event", event
        ));
    }

    // Get available dates in a range
    @GetMapping("/available-dates")
    public ResponseEntity<?> getAvailableDates(
            @RequestParam String startDate,
            @RequestParam String endDate) {
        try {
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);
            
            List<LocalDate> availableDates = start.datesUntil(end.plusDays(1))
                .filter(date -> !eventService.checkDateAvailability(date).get("available").equals(false))
                .toList();
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "availableDates", availableDates,
                "count", availableDates.size()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Invalid date format. Please use YYYY-MM-DD format."
            ));
        }
    }
} 