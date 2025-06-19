// src/utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/", // ✅ Important fix
  withCredentials: true, // optional, if you're using cookies
});

export default API;
