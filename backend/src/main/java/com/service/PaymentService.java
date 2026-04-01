package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Payment;
import com.repository.PaymentRepository;

@Service
public class PaymentService {

	@Autowired
	PaymentRepository prepo;
	
	// save payment example
	public Payment savePayment(Payment p)
	{
		if (p.getPaymentStatus() == null || p.getPaymentStatus().isEmpty()) {
	        p.setPaymentStatus("SUCCESS");
	    }
		return prepo.save(p);
	}
	
	public List<Payment> getAllPayments() {
	    return prepo.findAll();
	}
	
	public Payment getPaymentByBookingId(Long bookingId) {
	    return prepo.findByBookingId(bookingId);
	}


}
