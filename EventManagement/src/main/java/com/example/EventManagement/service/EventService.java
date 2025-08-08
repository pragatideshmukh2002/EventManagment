package com.example.EventManagement.service;

import com.example.EventManagement.entity.Event;
import com.example.EventManagement.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class EventService {
    
    @Autowired
    private EventRepository eventRepository;
    
    // Check if a date is available for booking
    public Map<String, Object> checkDateAvailability(LocalDate eventDate) {
        boolean isAvailable = !eventRepository.existsByEventDate(eventDate);
        
        Map<String, Object> response = new HashMap<>();
        response.put("date", eventDate.toString());
        response.put("available", isAvailable);
        
        if (!isAvailable) {
            response.put("message", "This date is already booked. Please choose another date.");
        } else {
            response.put("message", "This date is available for booking.");
        }
        
        return response;
    }
    
    // Create a new event booking
    public Map<String, Object> createEvent(Event event) {
        Map<String, Object> response = new HashMap<>();
        
        // Check if the date is available
        if (eventRepository.existsByEventDate(event.getEventDate())) {
            response.put("success", false);
            response.put("message", "This date is already booked. Please choose another date.");
            return response;
        }
        
        // Validate minimum guests
        if (event.getNumberOfGuests() < 100) {
            response.put("success", false);
            response.put("message", "Minimum 100 guests are required.");
            return response;
        }
        
        // Calculate amounts if not provided
        if (event.getTotalAmount() == null) {
            calculateEventAmounts(event);
        }
        
        try {
            Event savedEvent = eventRepository.save(event);
            response.put("success", true);
            response.put("message", "Event booked successfully!");
            response.put("event", savedEvent);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error creating event: " + e.getMessage());
        }
        
        return response;
    }
    
    // Calculate event amounts based on package and guests
    public void calculateEventAmounts(Event event) {
        int guests = event.getNumberOfGuests();
        BigDecimal totalAmount = BigDecimal.ZERO;
        
        // Package rates
        Map<String, Map<String, BigDecimal>> packageRates = new HashMap<>();
        packageRates.put("silver", Map.of("base", new BigDecimal("100000"), "extra", new BigDecimal("40000")));
        packageRates.put("gold", Map.of("base", new BigDecimal("150000"), "extra", new BigDecimal("25000")));
        packageRates.put("platinum", Map.of("base", new BigDecimal("200000"), "extra", new BigDecimal("25000")));
        
        // Calculate package amount
        String packageType = event.getPackageType().toLowerCase();
        Map<String, BigDecimal> rates = packageRates.get(packageType);
        
        if (guests <= 200) {
            totalAmount = rates.get("base");
        } else {
            int extraGuests = guests - 200;
            int extraSlabs = (int) Math.ceil((double) extraGuests / 200);
            totalAmount = rates.get("base").add(rates.get("extra").multiply(new BigDecimal(extraSlabs)));
        }
        
        // Add catering charges
        if ("yes".equalsIgnoreCase(event.getCateringRequired())) {
            BigDecimal cateringChargePerGuest = BigDecimal.ZERO;
            
            if ("veg".equalsIgnoreCase(event.getCateringType())) {
                cateringChargePerGuest = "basic".equalsIgnoreCase(event.getMenuType()) 
                    ? new BigDecimal("600") 
                    : new BigDecimal("900");
            } else if ("nonveg".equalsIgnoreCase(event.getCateringType())) {
                cateringChargePerGuest = "basic".equalsIgnoreCase(event.getMenuType()) 
                    ? new BigDecimal("800") 
                    : new BigDecimal("1200");
            }
            
            totalAmount = totalAmount.add(cateringChargePerGuest.multiply(new BigDecimal(guests)));
        }
        
        // Calculate final amount with tax (18%)
        BigDecimal taxAmount = totalAmount.multiply(new BigDecimal("0.18"));
        BigDecimal finalAmount = totalAmount.add(taxAmount);
        
        // Calculate balance
        BigDecimal advance = event.getAdvanceAmount() != null ? event.getAdvanceAmount() : BigDecimal.ZERO;
        BigDecimal balance = finalAmount.subtract(advance);
        
        event.setTotalAmount(totalAmount);
        event.setFinalAmount(finalAmount);
        event.setBalanceAmount(balance);
    }
    
    // Get all events
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    
    // Get event by ID
    public Event getEventById(Long id) {
        return eventRepository.findById(id).orElse(null);
    }
    
    // Get events by customer name
    public List<Event> getEventsByCustomer(String customerName) {
        return eventRepository.findByCustomerNameOrderByEventDateDesc(customerName);
    }
    
    // Get events by customer email
    public List<Event> getEventsByCustomerEmail(String customerEmail) {
        System.out.println("=== DEBUG: EventService.getEventsByCustomerEmail ===");
        System.out.println("Searching for email: " + customerEmail);
        
        try {
            // First try to find events with the exact email
            List<Event> events = eventRepository.findByCustomerEmailOrderByEventDateDesc(customerEmail);
            System.out.println("Found " + events.size() + " events with exact email match");
            
            // If no events found, try to find events with null/empty email (for backward compatibility)
            if (events.isEmpty()) {
                System.out.println("No exact matches found, trying null/empty email search...");
                events = eventRepository.findByCustomerEmailOrNullOrderByEventDateDesc(customerEmail);
                System.out.println("Found " + events.size() + " events with null/empty email");
            }
            
            return events;
        } catch (Exception e) {
            System.err.println("ERROR in EventService.getEventsByCustomerEmail: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
    
    // Get upcoming events
    public List<Event> getUpcomingEvents() {
        return eventRepository.findUpcomingEvents(LocalDate.now());
    }
    
    // Get past events
    public List<Event> getPastEvents() {
        return eventRepository.findPastEvents(LocalDate.now());
    }
    
    // Update event
    public Map<String, Object> updateEvent(Long id, Event updatedEvent) {
        Map<String, Object> response = new HashMap<>();
        
        Event existingEvent = eventRepository.findById(id).orElse(null);
        if (existingEvent == null) {
            response.put("success", false);
            response.put("message", "Event not found.");
            return response;
        }
        
        // Check if the new date conflicts with other bookings (excluding current event)
        if (!existingEvent.getEventDate().equals(updatedEvent.getEventDate())) {
            if (eventRepository.existsByEventDate(updatedEvent.getEventDate())) {
                response.put("success", false);
                response.put("message", "The new date is already booked. Please choose another date.");
                return response;
            }
        }
        
        // Update fields
        existingEvent.setCustomerName(updatedEvent.getCustomerName());
        existingEvent.setCustomerEmail(updatedEvent.getCustomerEmail());
        existingEvent.setEventDate(updatedEvent.getEventDate());
        existingEvent.setPackageType(updatedEvent.getPackageType());
        existingEvent.setNumberOfGuests(updatedEvent.getNumberOfGuests());
        existingEvent.setVenueName(updatedEvent.getVenueName());
        existingEvent.setVenueAddress(updatedEvent.getVenueAddress());
        existingEvent.setDecoration(updatedEvent.getDecoration());
        existingEvent.setCateringRequired(updatedEvent.getCateringRequired());
        existingEvent.setCateringType(updatedEvent.getCateringType());
        existingEvent.setMenuType(updatedEvent.getMenuType());
        existingEvent.setAdvanceAmount(updatedEvent.getAdvanceAmount());
        
        // Recalculate amounts
        calculateEventAmounts(existingEvent);
        
        try {
            Event savedEvent = eventRepository.save(existingEvent);
            response.put("success", true);
            response.put("message", "Event updated successfully!");
            response.put("event", savedEvent);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error updating event: " + e.getMessage());
        }
        
        return response;
    }
    
    // Delete event
    public Map<String, Object> deleteEvent(Long id) {
        Map<String, Object> response = new HashMap<>();
        
        if (!eventRepository.existsById(id)) {
            response.put("success", false);
            response.put("message", "Event not found.");
            return response;
        }
        
        try {
            eventRepository.deleteById(id);
            response.put("success", true);
            response.put("message", "Event deleted successfully!");
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error deleting event: " + e.getMessage());
        }
        
        return response;
    }
    
    // Update existing events with customerEmail (for migration)
    public void updateExistingEventsWithEmail() {
        List<Event> eventsWithoutEmail = eventRepository.findAll().stream()
            .filter(event -> event.getCustomerEmail() == null || event.getCustomerEmail().isEmpty())
            .collect(Collectors.toList());
        
        for (Event event : eventsWithoutEmail) {
            // Set a default email based on customer name or use a placeholder
            String defaultEmail = event.getCustomerName() != null ? 
                event.getCustomerName().toLowerCase().replaceAll("\\s+", "") + "@example.com" : 
                "unknown@example.com";
            event.setCustomerEmail(defaultEmail);
            eventRepository.save(event);
        }
    }
} 