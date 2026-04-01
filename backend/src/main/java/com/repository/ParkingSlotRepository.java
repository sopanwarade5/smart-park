package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.ParkingSlot;

@Repository
public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long>{
	
	List<ParkingSlot> findByOccupied(boolean occupied);
	
	List<ParkingSlot> findByVehicleType(String vehicleType);
	
	List<ParkingSlot> findByVehicleTypeAndOccupied(String vehicleType, boolean occupied);

	ParkingSlot findFirstByVehicleTypeAndOccupiedFalse(String vehicleType);
	
	List<ParkingSlot> findByArea_AreaIdAndVehicleTypeAndOccupiedFalse(
	        Long areaId,
	        String vehicleType
	);

	ParkingSlot findFirstByArea_AreaIdAndVehicleTypeAndOccupiedFalse(
			Long areaId,
			String vehicleType
	);


}
