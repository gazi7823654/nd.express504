
//৪.১
const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  // 👉 1. টোকেন বানাইতেছি
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // 👉 ৭ দিন মেয়াদ
  });

  // 👉 2. কুকিতে সেট করতেছি
  res.cookie("jwt", token, {
    httpOnly: true, // 👉 JS access করতে পারবে না (secure)
    secure: process.env.NODE_ENV === "production", // 👉 প্রোডাকশনে HTTPS দরকার
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 👉 ৭ দিন
  });
};

module.exports = generateToken;
