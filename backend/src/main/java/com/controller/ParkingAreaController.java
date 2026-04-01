package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.entity.ParkingArea;
import com.service.ParkingAreaService;

@RestController
@RequestMapping("/areas")
@CrossOrigin
public class ParkingAreaController {

	@Autowired
	ParkingAreaService paservice;
	
	// add area
	@PostMapping("/add")
	public ParkingArea addarea(@RequestBody ParkingArea area)
	{
		return paservice.addParkingArea(area);
	}
	
	// get all areas
	@GetMapping("/all")
	public List<ParkingArea> getAllAreas()
	{
		return paservice.getAllParkingArea();
	}
	
	// get area by id
	@GetMapping("/get/{areaid}")
	public ParkingArea getAreaById(@PathVariable long areaid)
	{
		return paservice.getAreaById(areaid);
	}

	// ❌ Delete parking area by id
	@DeleteMapping("/delete/{id}")
	public String deleteParkingArea(@PathVariable long id) {
		paservice.deleteAreaById(id);
		return "Parking area deleted successfully";
	}


}
