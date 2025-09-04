// src/utils/axios_api.js
import axios from "axios";   // axios ইমপোর্ট

const API = axios.create({
  baseURL: "http://localhost:5000/api",  // Backend API এর baseURL
  withCredentials: true,                 // কুকি/টোকেন পাঠানোর জন্য
});

export default API;  // Export করা হলো
