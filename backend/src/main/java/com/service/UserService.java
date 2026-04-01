package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.User;
import com.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository urepo;
	
	// register user example
	public User register(User u)
	{
		return urepo.save(u);
	}
	
	// login user
	public User login(String email, String password)
	{
		User user = urepo.findByEmail(email);
		
		if(user == null)
		{
			throw new RuntimeException("Invalid Email");
		}
		if(!user.getPassword().equals(password))
		{
			throw new RuntimeException("Invalid Password");
		}
		return user;
	}
	

    public User registerUser(User user) {
    	
        if (urepo.existsByEmail(user.getEmail())) {
            throw new RuntimeException("EMAIL_ALREADY_EXISTS");
        }
        return urepo.save(user);
    }
}
