import axios from "axios";


const api = axios.create({
  baseURL: "https://smart-park-49ix.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

//http://3.110.238.128:8080/Smart-Park-System-0.0.1-SNAPSHOT
export default api;
    
