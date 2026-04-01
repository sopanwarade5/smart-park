package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.ParkingSlot;
import com.repository.ParkingSlotRepository;

@Service
public class ParkingSlotService {

    @Autowired
    ParkingSlotRepository psrepo;

    // add slot
    public ParkingSlot addSlot(ParkingSlot slot) {
        slot.setOccupied(false);
        return psrepo.save(slot);
    }

    // get all slots
    public List<ParkingSlot> getAllSlot() {
        return psrepo.findAll();
    }

    // available slots
    public List<ParkingSlot> getAvailableSlots() {
        return psrepo.findByOccupied(false);
    }

    // occupy slot
    public void occupySlot(Long slotId) {
        ParkingSlot slot = psrepo.findById(slotId)
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        if (Boolean.TRUE.equals(slot.getOccupied())) {
            throw new RuntimeException("Slot already occupied");
        }

        slot.setOccupied(true);
        psrepo.save(slot);
    }

    // free slot
    public void freeSlot(Long slotId) {
        ParkingSlot slot = psrepo.findById(slotId)
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        slot.setOccupied(false);
        psrepo.save(slot);
    }

    // delete slot by id (SAFETY CHECK)
    public void deleteSlotById(Long slotId) {
        ParkingSlot slot = psrepo.findById(slotId)
                .orElseThrow(() ->
                        new RuntimeException("Parking slot not found with id: " + slotId));

        if (Boolean.TRUE.equals(slot.getOccupied())) {
            throw new RuntimeException("Cannot delete occupied slot");
        }

        psrepo.deleteById(slotId);
    }
    
    public List<ParkingSlot> getAvailableSlotsByAreaAndType(Long areaId, String vehicleType) {
        return psrepo.findByArea_AreaIdAndVehicleTypeAndOccupiedFalse(areaId, vehicleType);
    }

}
