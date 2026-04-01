package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long>{
	
	List<Payment> findByPaymentStatus(String paymentStatus);
	
	List<Payment> findByPaymentMode(String paymentMode);
	
	Payment findByBookingId(Long bookingId);
}