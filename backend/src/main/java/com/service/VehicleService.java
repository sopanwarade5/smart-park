package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Vehicle;
import com.repository.VehicleRepository;

@Service
public class VehicleService {

	@Autowired
	VehicleRepository vrepo;
	
	// add vehicle example
	public Vehicle addvehicle(Vehicle v)
	{
		return vrepo.save(v);
	}
}
