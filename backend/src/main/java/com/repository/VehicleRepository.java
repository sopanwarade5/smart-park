package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.Vehicle;


@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long>{

    List<Vehicle> findByVehicleType(String vehicleType);


}
