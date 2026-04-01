package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Vehicle;
import com.service.VehicleService;

@RestController
@RequestMapping("/vehicles")
@CrossOrigin
public class VehicleController {

	@Autowired
	VehicleService vehicleService;
	
	// add vehicle
	@PostMapping("/add")
	public Vehicle addVehicle(@RequestBody Vehicle vehicle)
	{
		return vehicleService.addvehicle(vehicle);
	}
}
