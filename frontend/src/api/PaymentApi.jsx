import api from "./axios";

// USER – make payment
export const makePayment = (paymentData) => {
  return api.post("/payments/pay", paymentData);
};

// USER – get payment by booking
export const getPaymentByBooking = (bookingId) => {
  return api.get(`/payments/booking/${bookingId}`);
};

// ADMIN
export const getAllPayments = () => {
  return api.get("/payments/all");
};
