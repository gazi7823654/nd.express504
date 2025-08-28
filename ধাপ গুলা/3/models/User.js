
//1.2 models/User.js
import mongoose from "mongoose"; // 👉 mongoose আনলাম

// User Schema বানালাম
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String, // 👉 নাম স্ট্রিং হবে
      required: true, // 👉 নাম অবশ্যই দিতে হবে
    },
    email: {
      type: String, // 👉 ইমেইল স্ট্রিং হবে
      required: true, // 👉 অবশ্যই দিতে হবে
      unique: true, // 👉 ডুপ্লিকেট হবে না
    },
  },
  {
    timestamps: true, // 👉 createdAt, updatedAt স্বয়ংক্রিয়ভাবে যোগ হবে
  }
);

// মডেল বানালাম
const User = mongoose.model("User", userSchema);

// এক্সপোর্ট করলাম
export default User;
