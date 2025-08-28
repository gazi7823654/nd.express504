
// server.js
import express from "express"; // 👉 express আনলাম
import dotenv from "dotenv"; // 👉 dotenv আনলাম
import connectDB from "./config/db.js"; // 👉 আমাদের DB ফাংশন আনলাম

dotenv.config(); // 👉 .env থেকে ভেরিয়েবল লোড করলাম

const app = express(); // 👉 express অ্যাপ বানালাম

// MongoDB Atlas কানেক্ট করলাম
connectDB();

// একটি সাধারণ রুট টেস্ট করার জন্য
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// সার্ভার চালানো
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
