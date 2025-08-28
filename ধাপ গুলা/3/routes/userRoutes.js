//3.2
// routes/userRoutes.js
import express from "express";
import { createUser } from "../controllers/userController.js";

const router = express.Router();

// Create User route
router.post("/create", createUser);

export default router;
