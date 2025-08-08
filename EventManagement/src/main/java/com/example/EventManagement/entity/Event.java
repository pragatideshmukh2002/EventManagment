package com.example.EventManagement.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.math.BigDecimal;

@Entity
@Table(name = "events")
public class Event {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "booking_form_title")
    private String bookingFormTitle;

    public String getBookingFormTitle() {
        return bookingFormTitle;
    }

    public void setBookingFormTitle(String bookingFormTitle) {
        this.bookingFormTitle = bookingFormTitle;
    }

    private String customerName;
    
    @Column(name = "customer_email")
    private String customerEmail;
    
    @Column(name = "event_date", nullable = false)
    private LocalDate eventDate;
    
    private String packageType;
    private Integer numberOfGuests;
    private String venueName;
    private String venueAddress;
    private String decoration;
    private String cateringRequired;
    private String cateringType;
    private String menuType;
    private BigDecimal totalAmount;
    private BigDecimal finalAmount;
    private BigDecimal advanceAmount;
    private BigDecimal balanceAmount;
    
    @Column(name = "created_at")
    private LocalDate createdAt;
    
    @Column(name = "booking_status")
    private String bookingStatus = "CONFIRMED";
    
    // Default constructor
    public Event() {
        this.createdAt = LocalDate.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getCustomerName() {
        return customerName;
    }
    
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
    
    public String getCustomerEmail() {
        return customerEmail;
    }
    
    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }
    
    public LocalDate getEventDate() {
        return eventDate;
    }
    
    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }
    
    public String getPackageType() {
        return packageType;
    }
    
    public void setPackageType(String packageType) {
        this.packageType = packageType;
    }
    
    public Integer getNumberOfGuests() {
        return numberOfGuests;
    }
    
    public void setNumberOfGuests(Integer numberOfGuests) {
        this.numberOfGuests = numberOfGuests;
    }
    
    public String getVenueName() {
        return venueName;
    }
    
    public void setVenueName(String venueName) {
        this.venueName = venueName;
    }
    
    public String getVenueAddress() {
        return venueAddress;
    }
    
    public void setVenueAddress(String venueAddress) {
        this.venueAddress = venueAddress;
    }
    
    public String getDecoration() {
        return decoration;
    }
    
    public void setDecoration(String decoration) {
        this.decoration = decoration;
    }
    
    public String getCateringRequired() {
        return cateringRequired;
    }
    
    public void setCateringRequired(String cateringRequired) {
        this.cateringRequired = cateringRequired;
    }
    
    public String getCateringType() {
        return cateringType;
    }
    
    public void setCateringType(String cateringType) {
        this.cateringType = cateringType;
    }
    
    public String getMenuType() {
        return menuType;
    }
    
    public void setMenuType(String menuType) {
        this.menuType = menuType;
    }
    
    public BigDecimal getTotalAmount() {
        return totalAmount;
    }
    
    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }
    
    public BigDecimal getFinalAmount() {
        return finalAmount;
    }
    
    public void setFinalAmount(BigDecimal finalAmount) {
        this.finalAmount = finalAmount;
    }
    
    public BigDecimal getAdvanceAmount() {
        return advanceAmount;
    }
    
    public void setAdvanceAmount(BigDecimal advanceAmount) {
        this.advanceAmount = advanceAmount;
    }
    
    public BigDecimal getBalanceAmount() {
        return balanceAmount;
    }
    
    public void setBalanceAmount(BigDecimal balanceAmount) {
        this.balanceAmount = balanceAmount;
    }
    
    public LocalDate getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }
    
    public String getBookingStatus() {
        return bookingStatus;
    }
    
    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }
} 