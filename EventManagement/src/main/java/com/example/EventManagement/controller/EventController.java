package com.example.EventManagement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {

    @GetMapping
    public ResponseEntity<?> getEvents() {
        // This endpoint is protected and requires authentication
        return ResponseEntity.ok(Map.of(
            "message", "Events data retrieved successfully",
            "events", "Protected events data"
        ));
    }

    @PostMapping
    public ResponseEntity<?> createEvent(@RequestBody Map<String, Object> eventData) {
        // This endpoint is protected and requires authentication
        return ResponseEntity.ok(Map.of(
            "message", "Event created successfully",
            "event", eventData
        ));
    }
} 