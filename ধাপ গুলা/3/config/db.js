//1.1 config/db.js
import mongoose from "mongoose"; // 👉 mongoose আনলাম

// MongoDB কানেকশন ফাংশন
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); // 👉 Atlas URI দিয়ে কানেক্ট করলাম
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`); // 👉 সফল হলে মেসেজ
  } catch (error) {
    console.error(`❌ Error: ${error.message}`); // 👉 ভুল হলে এরর দেখাবে
    process.exit(1); // 👉 কানেকশন ব্যর্থ হলে সার্ভার বন্ধ
  }
};

export default connectDB; // 👉 এক্সপোর্ট করলাম
