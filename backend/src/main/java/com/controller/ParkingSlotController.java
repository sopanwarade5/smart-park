package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.ParkingArea;
import com.entity.ParkingSlot;
import com.repository.ParkingAreaRepository;
import com.service.ParkingSlotService;

@RestController
@RequestMapping("/slots")
@CrossOrigin
public class ParkingSlotController {

    @Autowired
    ParkingSlotService psservice;

    @Autowired
    ParkingAreaRepository areaRepo; 

    // ADD SLOT UNDER AREA
    @PostMapping("/add/{areaId}")
    public ParkingSlot addSlot(
            @PathVariable Long areaId,
            @RequestBody ParkingSlot slot) {

        ParkingArea area = areaRepo.findById(areaId)
                .orElseThrow(() -> new RuntimeException("Area not found"));

        slot.setArea(area);
        slot.setOccupied(false);

        return psservice.addSlot(slot);
    }

    // get all slots
    @GetMapping("/all")
    public List<ParkingSlot> getAllSlot() {
        return psservice.getAllSlot();
    }

    // get available slots
    @GetMapping("/available")
    public List<ParkingSlot> getAvailableSlot() {
        return psservice.getAvailableSlots();
    }

    // delete slot
    @DeleteMapping("/delete/{slotId}")
    public String deleteSlot(@PathVariable Long slotId) {
        psservice.deleteSlotById(slotId);
        return "Parking slot deleted successfully";
    }
}
