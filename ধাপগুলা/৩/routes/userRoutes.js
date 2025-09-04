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