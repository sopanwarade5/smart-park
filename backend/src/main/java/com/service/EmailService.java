package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendBookingConfirmation(
            String toEmail,
            String userName,
            String areaName,
            String slotNumber,
            String vehicleNumber,
            String vehicleType,
            String entryTime
    ) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("🚗 Parking Slot Booked Successfully");

        message.setText(
                "Hello " + userName + ",\n\n" +
                "Your parking slot has been booked successfully.\n\n" +
                "📍 Area       : " + areaName + "\n" +
                "🅿 Slot No    : " + slotNumber + "\n" +
                "🚘 Vehicle    : " + vehicleNumber + " (" + vehicleType + ")\n" +
                "⏰ Entry Time : " + entryTime + "\n\n" +
                "Status       : ACTIVE\n\n" +
                "Thank you for using Smart Park 🚀\n\n" +
                "— Smart Park Team"
        );

        mailSender.send(message);
    }
}
