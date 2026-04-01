import api from "./axios";

// ADMIN – add slot under area
export const addParkingSlot = (areaId, slot) => {
  return api.post(`/slots/add/${areaId}`, slot);
};

// ADMIN – all slots
export const getAllParkingSlots = () => {
  return api.get("/slots/all");
};

// ADMIN – available slots
export const getAvailableParkingSlots = () => {
  return api.get("/slots/available");
};

// USER – available slots by area + vehicle
export const getAvailableSlotsByAreaAndType = (areaId, vehicleType) => {
  return api.get(`/slots/available/${areaId}/${vehicleType}`);
};

// DELETE SLOT
export const deleteParkingSlot = (slotId) => {
  return api.delete(`/slots/delete/${slotId}`);
};
