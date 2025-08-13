
/*
// আগে ৪ এ করছিলাম কিন্তু ৫ এ এখন আপডেট হবে
// //4.4
// // শুধুমাত্র লগ ইন করা ব্যাক্তি দেখতে পাবে Protect Middleware
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.jwt) {
    try {
      const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("অবৈধ টোকেন");
    }
  } else {
    res.status(401);
    throw new Error("টোকেন নেই, অথরাইজড না");
  }
});

module.exports = { protect };
*/

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

//5.2 প্রোটেক্টেড রুটের জন্য JWT টোকেন যাচাই middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // কুকি থেকে টোকেন নেবো
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    res.status(401);
    throw new Error("টোকেন পাওয়া যায়নি, লগইন করুন");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    res.status(401);
    throw new Error("অবৈধ টোকেন");
  }
});

module.exports = { protect };



