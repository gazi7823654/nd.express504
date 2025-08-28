
// src/utils/apiClient.js
import axios from "axios"; // 👉 axios আনলাম

// axios instance তৈরি করলাম
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 👉 backend base url
  withCredentials: true, // 👉 কুকি/টোকেনও পাঠাবে
});

export default apiClient; // 👉 এক্সপোর্ট করলাম
