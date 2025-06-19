import axios from "axios";
console.log("📦 API Base URL:", process.env.REACT_APP_API_BASE_URL);
// ✅ Use environment variable instead of hardcoding
const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
  withCredentials: true,
});

export default API;3

