

import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/users", protect, getAllUsers);
router.get("/users/:id", protect, getSingleUser);
router.post("/users", protect, createUser);
router.put("/users/:id", protect, updateUser);
router.delete("/users/:id", protect, deleteUser);

export default router;


/*
import express from "express";
import {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// GET all users
router.get("/users", getAllUsers);

// GET single user by ID
router.get("/users/:id", getSingleUser);

// POST new user
router.post("/users", createUser);

// PUT update user
router.put("/users/:id", updateUser);

// DELETE user
router.delete("/users/:id", deleteUser);

export default router;
*/


/*
import express from "express";
import {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);       // GET all users
router.get("/:id", getSingleUser);  // GET single user by ID
router.post("/", createUser);       // POST new user
router.put("/:id", updateUser);     // PUT update user
router.delete("/:id", deleteUser);  // DELETE user

export default router;
*/