package com.example.EventManagement.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")  // Allow React frontend access
public class PaymentController {

    private RazorpayClient razorpayClient;

    public PaymentController() throws Exception {
        razorpayClient = new RazorpayClient("rzp_test_s7RTLvVYmptGbh", "jDaVl2OwFkSwSwIRFMx6iLaM");
    }

    @PostMapping("/create-order")
    public String createOrder(@RequestBody OrderRequest orderRequest) throws Exception {
        JSONObject options = new JSONObject();
        options.put("amount", orderRequest.getAmount() * 100); // amount in paise
        options.put("currency", "INR");
        options.put("payment_capture", 1);

        Order order = razorpayClient.Orders.create(options);
        return order.toString();  // Return JSON string
    }
}

class OrderRequest {
    private int amount;

    public int getAmount() { return amount; }
    public void setAmount(int amount) { this.amount = amount; }
}
