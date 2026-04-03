package com.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.entity.Booking;
import com.entity.ParkingSlot;
import com.entity.User;
import com.repository.BookingRepository;
import com.repository.ParkingSlotRepository;
import com.repository.UserRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ParkingSlotRepository parkingSlotRepository;

    @Autowired
    private UserRepository userRepository;


    //   ENTRY – USER BOOKS SLOT (AREA + VEHICLE TYPE)
      
    @Transactional
    public Booking createBooking(Booking booking) {

        // ===== VALIDATIONS =====
        if (booking.getUserId() == null) {
            throw new RuntimeException("User not logged in");
        }

        if (booking.getAreaId() == null) {
            throw new RuntimeException("Parking area must be selected");
        }

        if (booking.getVehicleType() == null ||
                (!booking.getVehicleType().equalsIgnoreCase("CAR")
                        && !booking.getVehicleType().equalsIgnoreCase("BIKE"))) {
            throw new RuntimeException("Vehicle type must be CAR or BIKE");
        }	

        if (booking.getVehicleId() == null || booking.getVehicleId().isBlank()) {
            throw new RuntimeException("Vehicle number required");
        }

        String vehicleType = booking.getVehicleType().toUpperCase();

        // ===== FIND SLOT (AREA + VEHICLE TYPE) =====
        ParkingSlot slot =
                parkingSlotRepository
                        .findFirstByArea_AreaIdAndVehicleTypeAndOccupiedFalse(
                                booking.getAreaId(),
                                vehicleType
                        );

        if (slot == null) {
            throw new RuntimeException(
                    vehicleType + " slot not available in selected area"
            );
        }

        // ===== OCCUPY SLOT =====
        slot.setOccupied(true);
        parkingSlotRepository.save(slot);

        // ===== SAVE BOOKING =====
        booking.setSlotId(slot.getSlotId());
        booking.setVehicleType(vehicleType);
        booking.setEntryTime(LocalDateTime.now());
        booking.setStatus("ACTIVE");

        Booking savedBooking = bookingRepository.save(booking);

        return savedBooking;
    }
    
    //   EXIT – USER EXITS PARKING
    @Transactional
    public Booking closeBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!"ACTIVE".equals(booking.getStatus())) {
            throw new RuntimeException("Booking already closed");
        }

        booking.setExitTime(LocalDateTime.now());

        long hours = Duration.between(
                booking.getEntryTime(),
                booking.getExitTime()
        ).toHours();

        if (hours <= 0) hours = 1;

        booking.setAmount(hours * 50);
        booking.setStatus("COMPLETED");

        ParkingSlot slot = parkingSlotRepository.findById(booking.getSlotId())
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        slot.setOccupied(false);
        parkingSlotRepository.save(slot);

        return bookingRepository.save(booking);
    }

    
     //  USER – MY BOOKINGS
    public List<Booking> getBookingByUser(Long userId) {
        return bookingRepository.findByUserIdOrderByBookingIdDesc(userId);
    }

    //   ADMIN – DASHBOARD ANALYTICS
       public Map<String, Object> adminAnalytics() {

        Map<String, Object> data = new HashMap<>();

        LocalDateTime todayStart =
                LocalDateTime.now().toLocalDate().atStartOfDay();

        data.put("carsToday",
                bookingRepository.countByVehicleTypeAndEntryTimeAfter(
                        "CAR", todayStart));

        data.put("bikesToday",
                bookingRepository.countByVehicleTypeAndEntryTimeAfter(
                        "BIKE", todayStart));

        data.put("activeBookings",
                bookingRepository.countByStatus("ACTIVE"));

        data.put("todayRevenue",
                bookingRepository.todayRevenue());

        return data;
    }

    //   ADMIN – ALL BOOKINGS
    public List<Booking> getAllBookings() {
        return bookingRepository.findAllByOrderByBookingIdDesc();
    }

    //COMMON
    public Booking getBookingById(Long bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }
    
}
