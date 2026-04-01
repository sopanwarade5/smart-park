import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

//http://3.110.238.128:8080/Smart-Park-System-0.0.1-SNAPSHOT
export default api;
    