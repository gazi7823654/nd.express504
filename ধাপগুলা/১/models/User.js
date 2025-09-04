import mongoose from "mongoose"; // MongoDB model তৈরির জন্য mongoose

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // নাম অবশ্যই লাগবে
  },
  email: {
    type: String,
    required: true, // ইমেইল অবশ্যই লাগবে
    unique: true,   // ইউনিক হতে হবে
  },
  password: {
    type: String,
    required: true, // পাসওয়ার্ড অবশ্যই লাগবে
  },
});

const User = mongoose.model("User", userSchema);

export default User;
