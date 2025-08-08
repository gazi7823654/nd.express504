
// তো এইগুলা আমরা ধাপ ১ এ করছিলাম  দেখার জন্য যে কাজ করে কিনা
// এখন ব্যাপার হইছে, আগে এই গুলা করতে হয় , পরে আবার কাটতে হয়।
//প্রথমে প্রয়োজন তাই করতে হয় তারপর প্রয়োজন শেষ তাই কাইটা ফালায়া দিতে হয়
// কাইটা দিতাছি সব গুলারে
// 1 er 2


// // mongoose মডিউল ইমপোর্ট করতেছি
// const mongoose = require("mongoose");

// // ইউজারের স্কিমা তৈরি
// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String, // 👉 নাম হবে স্ট্রিং
//       required: [true, "নাম দেওয়া বাধ্যতামূলক"], // 👉 validation মেসেজ
//     },
//     email: {
//       type: String, // 👉 ইমেইল হবে স্ট্রিং
//       required: [true, "ইমেইল প্রয়োজন"],
//       unique: true, // 👉 একই ইমেইল দ্বিতীয়বার না থাকে
//     },
//     password: {
//       type: String, // 👉 পাসওয়ার্ড হবে স্ট্রিং
//       required: [true, "পাসওয়ার্ড দিতে হবে"],
//     },
//     role: {
//       type: String,
//       enum: ["user", "admin"], // 👉 শুধু user বা admin হতে পারবে
//       default: "user", // 👉 ডিফল্ট user
//     },
//   },
//   {
//     timestamps: true, // 👉 createdAt ও updatedAt timestamp যোগ হবে
//   }
// );

// // মডেল এক্সপোর্ট করতেছি
// const User = mongoose.model("User", userSchema);
// module.exports = User;





// এখন আসল টা করুম 4.2
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "নাম প্রয়োজন"] },
    email: { type: String, required: [true, "ইমেইল প্রয়োজন"], unique: true },
    password: { type: String, required: [true, "পাসওয়ার্ড প্রয়োজন"] },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

// 👉 pre-save hook দিয়ে পাসওয়ার্ড hash করবো
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 👉 ইউজার মেথড: পাসওয়ার্ড ম্যাচ হচ্ছে কিনা
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;




