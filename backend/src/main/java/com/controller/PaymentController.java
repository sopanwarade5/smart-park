package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Payment;
import com.service.PaymentService;

@RestController
@RequestMapping("/payments")
@CrossOrigin
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    // USER PAY
    @PostMapping("/pay")
    public Payment makePayment(@RequestBody Payment payment) {
        return paymentService.savePayment(payment);
    }

    // ADMIN
    @GetMapping("/all")
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    // USER – get payment by booking
    @GetMapping("/booking/{bookingId}")
    public Payment getPaymentByBooking(
            @PathVariable Long bookingId) {
        return paymentService.getPaymentByBookingId(bookingId);
    }
}
