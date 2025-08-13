
/*
//3.2
 const express = require("express");
 const router = express.Router();
 const { registerUser } = require("../controllers/userController");

// 👉 POST রেজিস্টার API রাউট
router.post("/register", registerUser);

 module.exports = router;

*/


// ৪.5

const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");

const { protect } = require("../middlewares/authMiddleware");

// 👉 রেজিস্টার
router.post("/register", registerUser);

// 👉 লগইন
router.post("/login", loginUser);

// 👉 প্রোটেক্টেড প্রোফাইল
router.get("/profile", protect, getUserProfile);



module.exports = router;
