package com.example.EventManagement.controller;

import com.example.EventManagement.entity.Event;
import com.example.EventManagement.service.EventService;
import com.example.EventManagement.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {

    @Autowired
    private EventService eventService;
    
    @Autowired
    private EventRepository eventRepository;

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
    
    // Test endpoint to verify backend is working
    @GetMapping("/test")
    public ResponseEntity<?> testEndpoint() {
        System.out.println("=== TEST ENDPOINT CALLED ===");
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Backend is working!",
            "timestamp", System.currentTimeMillis()
        ));
    }
    
    // Debug endpoint to check all events in database
    @GetMapping("/debug/all-events")
    public ResponseEntity<?> getAllEventsDebug() {
        System.out.println("=== DEBUG: Getting all events ===");
        List<Event> allEvents = eventService.getAllEvents();
        System.out.println("Total events in database: " + allEvents.size());
        
        for (Event event : allEvents) {
            System.out.println("Event ID: " + event.getId() + 
                             ", Customer: " + event.getCustomerName() + 
                             ", Email: " + event.getCustomerEmail() + 
                             ", Date: " + event.getEventDate());
        }
        
        return ResponseEntity.ok(Map.of(
            "success", true,
            "totalEvents", allEvents.size(),
            "events", allEvents
        ));
    }
    
    // Create test event for debugging
    @PostMapping("/debug/create-test-event")
    public ResponseEntity<?> createTestEvent() {
        System.out.println("=== DEBUG: Creating test event ===");
        try {
            Event testEvent = new Event();
            testEvent.setCustomerName("Vedant Nandokar");
            testEvent.setCustomerEmail("vedantnandokar3@gmail.com");
            testEvent.setEventDate(LocalDate.now().plusDays(30));
            testEvent.setPackageType("gold");
            testEvent.setNumberOfGuests(150);
            testEvent.setVenueName("Test Venue");
            testEvent.setVenueAddress("Test Address");
            testEvent.setDecoration("yes");
            testEvent.setCateringRequired("yes");
            testEvent.setCateringType("veg");
            testEvent.setMenuType("basic");
            testEvent.setAdvanceAmount(new java.math.BigDecimal("50000"));
            
            eventService.calculateEventAmounts(testEvent);
            Event savedEvent = eventRepository.save(testEvent);
            
            System.out.println("Test event created with ID: " + savedEvent.getId());
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Test event created successfully",
                "eventId", savedEvent.getId()
            ));
        } catch (Exception e) {
            System.err.println("ERROR creating test event: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "message", "Error creating test event: " + e.getMessage()
            ));
        }
    }
    
    // Get events by customer email
    @GetMapping("/customer-email/{customerEmail}")
    public ResponseEntity<?> getEventsByCustomerEmail(@PathVariable String customerEmail) {
        System.out.println("=== DEBUG: Customer Email Endpoint Called ===");
        System.out.println("Customer Email: " + customerEmail);
        
        try {
            List<Event> events = eventService.getEventsByCustomerEmail(customerEmail);
            System.out.println("Found " + events.size() + " events for email: " + customerEmail);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "events", events,
                "count", events.size()
            ));
        } catch (Exception e) {
            System.err.println("ERROR in getEventsByCustomerEmail: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "message", "Internal server error: " + e.getMessage()
            ));
        }
    }
    
    // Migration endpoint to update existing events with customerEmail
    @PostMapping("/migrate-customer-email")
    public ResponseEntity<?> migrateCustomerEmail() {
        try {
            eventService.updateExistingEventsWithEmail();
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Migration completed successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Migration failed: " + e.getMessage()
            ));
        }
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