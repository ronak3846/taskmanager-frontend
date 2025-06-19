import axios from "axios";

// Debug log
console.log(" BASE URL:", process.env.REACT_APP_API_BASE_URL);

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
  withCredentials: true,
});

export default API;
