# 🚗 Smart Park - Parking Management System

Smart Park is a full-stack web application built to streamline parking management by enabling users to book parking slots, track availability, and manage reservations in real-time.

---

## 🔥 Key Features

* 🔐 Secure User Authentication (Login & Registration)
* 🚘 Real-time Parking Slot Availability
* 📅 Seamless Slot Booking System
* 📊 Admin Controls for Managing Slots (if implemented)
* 📩 Email Notifications
---

## 🧠 Problem Statement

Finding parking in urban areas is time-consuming and inefficient.
Smart Park solves this by providing a digital platform to check availability and reserve parking slots instantly.

---

## 💡 Solution

This system allows users to:

* View available parking slots in real-time
* Book and manage parking easily
* Reduce time spent searching for parking

---

## 🛠️ Tech Stack

### Backend

* Java
* Spring Boot
* Spring Data JPA
* RESTful APIs

### Frontend

* React
* Bootstrap
* HTML
* CSS

### Database

* MySQL

### Tools & Technologies

* Git & GitHub
* Postman
* Maven

---

## 📂 Project Structure

smart-park/
├── backend/   → Spring Boot Application
├── frontend/  → React Application

---

## ⚙️ Installation & Setup

### 1. Clone Repository

git clone https://github.com/sopanwarade5/smart-park.git
cd smart-park

### 2. Backend Setup

cd backend
Configure application.properties (MySQL credentials)
mvn spring-boot:run

### 3. Frontend Setup

cd frontend
npm install
npm start

---

## 🔗 API Endpoints

POST /api/auth/register   → Register new user
POST /api/auth/login      → Authenticate user
GET /api/slots            → Fetch available slots
POST /api/bookings        → Book parking slot

---

## 🚀 Future Enhancements

* 💳 Online Payment Integration
* 📲 SMS Notifications
* 🔐 Role-Based Access Control (Admin/User)
* 📈 Analytics Dashboard

---

## 👨‍💻 Author

**Sopan Warade**
GitHub: https://github.com/sopanwarade5

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
