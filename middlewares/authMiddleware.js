
//4.4
// শুধুমাত্র লগ ইন করা ব্যাক্তি দেখতে পাবে Protect Middleware

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// 👉 token checker middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 👉 কুকিতে jwt থাকলে
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


