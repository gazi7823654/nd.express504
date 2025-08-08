//1 er 1


// MongoDB এর সাথে কানেকশন করার জন্য mongoose আনছি
const mongoose = require("mongoose"); // 👉 সাধারণভাবে mongoose ইউজ করবো

// DB কানেকশন ফাংশন
const connectDB = async () => {
  try {
    // MONGO_URI থেকে URI নিচ্ছি .env ফাইল থেকে
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // 👉 পুরাতন URI warning এড়াতে
      useUnifiedTopology: true, // 👉 ড্রাইভার অপ্টিমাইজ করার জন্য
    });

    // সফলভাবে কানেক্ট হলে লগ দেখাবো
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // 👉 সমস্যা হলে সার্ভার বন্ধ
  }
};

module.exports = connectDB;
