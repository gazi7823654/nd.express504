
/*
//3.2
// routes/userRoutes.js
import express from "express";
import { createUser } from "../controllers/userController.js";

const router = express.Router();

// Create User route
router.post("/create", createUser);

export default router;
*/


//4.5
// routes/userRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser); // 👉 রেজিস্টার
router.post("/login", loginUser); // 👉 লগইন
router.get("/profile", protect, getUserProfile); // 👉 প্রোটেক্টেড প্রোফাইল

export default router;
