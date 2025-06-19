import axios from "axios";

console.log("🔧 API Base URL:", import.meta.env.VITE_API_BASE_URL);

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  withCredentials: true,
});

export default API;
