

// //3.1 👉 asyncHandler দিয়ে error ধরে ফেলবো
// const asyncHandler = require("express-async-handler");

// // 👉 POST: /api/register
// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;

//   // 👉 1. Manual Validation (একটা ফিল্ডও না থাকলে error)
//   if (!name || !email || !password) {
//     res.status(400); // 👉 bad request
//     throw new Error("সব তথ্য দিতে হবে (নাম, ইমেইল, পাসওয়ার্ড)");
//   }

//   // 👉 পরবর্তীতে এখানে User তৈরি হবে
//   res.status(201).json({ message: "রেজিস্ট্রেশন সফল" });
// });

// module.exports = { registerUser };



//4.3
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// ✅ POST: /api/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // 👉 Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("সব তথ্য দিতে হবে");
  }

  // 👉 ইউজার এক্সিস্ট করছে কিনা
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("এই ইমেইল আগে থেকেই রেজিস্টার্ড");
  }

  // 👉 নতুন ইউজার তৈরি
  const user = await User.create({ name, email, password });

  // 👉 সফল হলে টোকেন issue
  generateToken(res, user._id);

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

// ✅ POST: /api/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 👉 ফিল্ড চেক
  if (!email || !password) {
    res.status(400);
    throw new Error("ইমেইল ও পাসওয়ার্ড দিতে হবে");
  }

  const user = await User.findOne({ email });

  // 👉 ইউজার আছে এবং পাসওয়ার্ড মিলে
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("ইমেইল বা পাসওয়ার্ড ভুল");
  }
});

// ✅ GET: /api/profile (protected)
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
});

module.exports = { registerUser, loginUser, getUserProfile };
