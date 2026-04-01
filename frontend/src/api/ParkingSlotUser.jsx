// src/api/BookingApi.js
import api from "./axios";

/* ===========================
   BOOKINGS API
   =========================== */

// CREATE BOOKING (USER)
export const createBooking = (bookingData) => {
  return api.post("/bookings/create", bookingData);
};

// CLOSE BOOKING
export const closeBooking = (bookingId) => {
  return api.put(`/bookings/close/${bookingId}`);
};

// USER BOOKINGS
export const getUserBookings = (userId) => {
  return api.get(`/bookings/user/${userId}`);
};

// ADMIN ANALYTICS
export const getAdminAnalytics = () => {
  return api.get("/bookings/admin/analytics");
};

// ADMIN HISTORY
export const getAllBookings = () => {
  return api.get("/bookings/admin/all");
};
