
//3.1
// controllers/userController.js
import User from "../models/User.js"; // User মডেল আনলাম

// Simple create user controller
export const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    // Input validation (manual/simple)
    if (!name || !email) {
      const error = new Error("Name and Email are required");
      error.statusCode = 400;
      throw error;
    }

    // Check duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Email already exists");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (err) {
    next(err); // Global error middleware এ পাঠানো
  }
};
