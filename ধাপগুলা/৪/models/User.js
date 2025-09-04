import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Password hash save করার জন্য pre-save middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password match করার method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;


/*
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
*/