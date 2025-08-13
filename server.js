
// 1.3 dn 
// এইবার ২.১ বসানোর পরে সোজা react.js  এ চলে যাবো 2dn

// express, dotenv ও কানেকশন ফাংশন আনছি
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); //2.1 👉 cors আনছি
const cookieParser = require("cookie-parser"); // ৪.৬ 👉 কুকি পার্সার আনছি
const path = require("path"); // ৬.৩ 👉 path মডিউল আনছি (uploads ফোল্ডার পাবলিক করতে লাগবে)
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");//3.3
const { notFound } = require("./middlewares/errorMiddleware");//3.3
const { errorHandler } = require("./middlewares/errorMiddleware");//3.3
// ৫.৪ 👉 কাস্টম লগার middleware ইম্পোর্ট করলাম
const logger = require("./middlewares/logger"); // ৫.৪
const uploadRoutes = require("./routes/uploadRoutes"); // ৬.৩
// env ফাইল লোড করতেছি
dotenv.config();

// এক্সপ্রেস অ্যাপ তৈরি করলাম
const app = express();

// JSON ডাটা পার্স করতে middleware
app.use(express.json());

// ৪.৬ 👉 কুকি পার্স করার middleware
app.use(cookieParser()); // 👉 কুকি থেকে ডাটা রিড করতে ব্যবহার হয়

// ৫.৪ 👉 কাস্টম লগার middleware অ্যাপ্লাই করলাম
app.use(logger); // ৫.৪

// PORT নিচ্ছি .env থেকে
const PORT = process.env.PORT || 5000;

// MongoDB কানেকশন কল
connectDB();

// 2.1👉 CORS সেটাপ: frontend থেকে রিকোয়েস্ট এলাউ করবো
app.use(
  cors({
    origin: "http://localhost:5173", // 👉 Vite frontend URL
    credentials: true, // 👉 Cookie/token allow করতে হলে true দিতে হয়
  })
);
//2.1 JSON parser middleware
app.use(express.json());
// 👉 Routes
app.use("/api", userRoutes); // ৩.৩ 👉 '/api' রুটে সব ইউজার রাউটস চলবে

// ৬.৩ 👉 Upload Route বসালাম
app.use("/api/upload", uploadRoutes); // 👉 আপলোড API এর জন্য রুট

// ৬.৩ 👉 uploads ফোল্ডার পাবলিক করলাম
app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); // 👉 আপলোড করা ফাইল ব্রাউজারে এক্সেস করা যাবে
// 👉 404 Not Found Middleware
app.use(notFound); // ৩.৩ 👉 যদি কোনো রাউট না মিলে, তাহলে 404 রেসপন্স দিবে

// 👉 Global Error Handler
app.use(errorHandler); // ৩.৩ 👉 সব ধরনের এররের জন্য গ্লোবাল হ্যান্ডলার

/*
// রুট রেসপন্স
app.get("/", (req, res) => {
  res.send(" Server is running");
});
*/



// অ্যাপ লিসেন করতেছি
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});













