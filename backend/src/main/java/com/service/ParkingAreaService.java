package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.ParkingArea;
import com.repository.ParkingAreaRepository;

@Service
public class ParkingAreaService {

    @Autowired
    ParkingAreaRepository parepo;

    // add parking area admin example
    public ParkingArea addParkingArea(ParkingArea area) {
        return parepo.save(area);
    }

    // get all areas
    public List<ParkingArea> getAllParkingArea() {
        return parepo.findAll();
    }

    // get area by id
    public ParkingArea getAreaById(long areaid) {
        return parepo.findById(areaid)
                .orElseThrow(() -> new RuntimeException("Parking area not Found"));
    }

    // delete area by id
    public void deleteAreaById(long areaid) {
        if (!parepo.existsById(areaid)) {
            throw new RuntimeException("Parking area not found with id: " + areaid);
        }
        parepo.deleteById(areaid);
    }

}
