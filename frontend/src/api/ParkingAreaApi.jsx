import api from "./axios";

// add area
export const addParkingArea = (area) => {
  return api.post("/areas/add", area);
};

// get all areas
export const getAllParkingAreas = () => {
  return api.get("/areas/all");
};

// get area by id
export const getParkingAreaById = (areaId) => {
  return api.get(`/areas/get/${areaId}`);
};

// delete area
export const deleteParkingArea = (areaId) => {
  return api.delete(`/areas/delete/${areaId}`);
};


