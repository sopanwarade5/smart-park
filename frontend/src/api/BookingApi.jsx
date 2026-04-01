import api from "./axios";

const app = process.env.REACT_APP_API_URL;

/* CREATE BOOKING */
export const createBooking = (bookingData) => {
  return api.post("/bookings/create", bookingData);
};

/* CLOSE BOOKING */
export const closeBooking = (bookingId) => {
  return api.put(`/bookings/close/${bookingId}`);
};

/* USER BOOKINGS */
export const getUserBookings = (userId) => {
  return api.get(`/bookings/user/${userId}`);
};

/* GET BOOKING BY ID (IMPORTANT) */
export const getBookingById = (bookingId) => {
  return api.get(`/bookings/${bookingId}`);
};

/* ADMIN */
export const getAdminAnalytics = () => {
  return api.get("/bookings/admin/analytics");
};

export const getAllBookings = () => {
  return api.get("/bookings/admin/all");
};
