package com.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.Booking;
import com.service.BookingService;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

	@Autowired
	private BookingService bookingService;

	// ================= ENTRY =================
	// POST /bookings/create
	@PostMapping("/create")
	public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
		try {
			Booking savedBooking = bookingService.createBooking(booking);
			return ResponseEntity.ok(savedBooking);
		} catch (RuntimeException e) {
			return ResponseEntity
					.status(HttpStatus.BAD_REQUEST)
					.body(Map.of("message", e.getMessage()));
		}
	}

	// ================= EXIT =================
	// PUT /bookings/close/{bookingId}
	@PutMapping("/close/{bookingId}")
	public ResponseEntity<?> closeBooking(@PathVariable Long bookingId) {
		try {
			Booking closed = bookingService.closeBooking(bookingId);
			return ResponseEntity.ok(closed);
		} catch (RuntimeException e) {
			return ResponseEntity
					.status(HttpStatus.BAD_REQUEST)
					.body(Map.of("message", e.getMessage()));
		}
	}

	// ================= USER BOOKINGS =================
	// GET /bookings/user/{userId}
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<Booking>> getUserBookings(@PathVariable Long userId) {
		return ResponseEntity.ok(bookingService.getBookingByUser(userId));
	}

	// ================= ADMIN ANALYTICS =================
	// GET /bookings/admin/analytics
	@GetMapping("/admin/analytics")
	public ResponseEntity<Map<String, Object>> adminAnalytics() {
		return ResponseEntity.ok(bookingService.adminAnalytics());
	}

	// ================= ADMIN BOOKING HISTORY =================
	// GET /bookings/admin/all
	@GetMapping("/admin/all")
	public ResponseEntity<List<Booking>> adminBookings() {
		return ResponseEntity.ok(bookingService.getAllBookings());
	}
	// ================= GET BOOKING BY ID =================
	// GET /bookings/{bookingId}
	@GetMapping("/{bookingId}")
	public ResponseEntity<?> getBookingById(@PathVariable Long bookingId) {
		try {
			return ResponseEntity.ok(bookingService.getBookingById(bookingId));
		} catch (RuntimeException e) {
			return ResponseEntity
					.status(HttpStatus.NOT_FOUND)
					.body(Map.of("message", e.getMessage()));
		}
	}

}
