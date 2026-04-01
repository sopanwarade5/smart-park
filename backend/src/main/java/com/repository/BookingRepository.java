package com.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    List<Booking> findAllByOrderByBookingIdDesc();

    @Query("SELECT COALESCE(SUM(b.amount),0) FROM Booking b " +
           "WHERE DATE(b.exitTime) = CURRENT_DATE")
    double todayRevenue();
    
    List<Booking> findByUserIdOrderByBookingIdDesc(Long userId);

    long countByVehicleTypeAndEntryTimeAfter(String vehicleType, LocalDateTime time);

    long countByStatus(String status);
}
