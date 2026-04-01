package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.User;
import com.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    // ================= REGISTER =================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        try {
            User savedUser = userService.registerUser(user);
            return ResponseEntity.ok(savedUser);

        } catch (RuntimeException e) {

            if ("EMAIL_ALREADY_EXISTS".equals(e.getMessage())) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body("Email already exists");
            }

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Registration failed");
        }
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        try {
            User loggedUser = userService.login(
                    user.getEmail(),
                    user.getPassword()
            );

            return ResponseEntity.ok(loggedUser);

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }
    }
}
