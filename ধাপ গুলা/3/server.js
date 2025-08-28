
// server.js
import express from "express"; // 👉 express আনলাম
import dotenv from "dotenv"; // 👉 dotenv আনলাম
import connectDB from "./config/db.js"; // 👉 আমাদের DB ফাংশন আনলাম
import cors from "cors"; // 👉 2.1
import userRoutes from "./routes/userRoutes.js"; // 👉 3.4
import { errorHandler } from "./middlewares/errorMiddleware.js"; // 👉 3.4

dotenv.config(); // 👉 .env থেকে ভেরিয়েবল লোড করলাম

const app = express(); // 👉 express অ্যাপ বানালাম

// MongoDB Atlas কানেক্ট করলাম
connectDB();

app.use(express.json());//2.1
// CORS middleware সেটআপ 2.1
app.use(
  cors({ // 👉 2.1
    origin: "http://localhost:5173", // 👉 2.1 (React Vite এর frontend URL)
    credentials: true, // 👉 2.1 (কুকি/টোকেন পাঠানোর অনুমতি)
  })
);

// একটি সাধারণ রুট টেস্ট করার জন্য
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// টেস্ট রুট (ফ্রন্টএন্ড থেকে চেক করার জন্য)2.2
app.get("/api/test", (req, res) => { // 👉 2.1
  res.json({ message: "✅ Backend API is working fine!" }); // 👉 2.1
});

// User routes
app.use("/api/users", userRoutes); // 👉 3.4

// Global error handler
app.use(errorHandler); // 👉 3.4

// সার্ভার চালানো
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
