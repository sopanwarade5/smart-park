import api from "./axios";

// register user
export const registerUser = (user) => {
  return api.post("/users/register", user);
};

// login user
export const loginUser = (email, password) => {
  return api.post("/users/login", { email, password });
}