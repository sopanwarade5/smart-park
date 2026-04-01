package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.ParkingArea;

@Repository
public interface ParkingAreaRepository extends JpaRepository<ParkingArea, Long>{

}
