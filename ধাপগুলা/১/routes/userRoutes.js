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
