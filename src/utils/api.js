import axios from "axios";

// TEMP: Manually define backend base URL
const API = axios.create({
  baseURL: "https://taskmanager-backend-zlv5.onrender.com/api",
  withCredentials: true,
});

export default API;
