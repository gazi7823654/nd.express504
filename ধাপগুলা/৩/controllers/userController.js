import User from "../models/User.js"; // User model import
import Joi from "joi"; // 👉 নতুন Joi import

// 👉 নতুন: Create & Update এর জন্য Joi schema
const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// GET all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find(); // সব user আনা
    res.json(users);
  } catch (error) {
    next(error); // 👉 নতুন: global error middleware এ পাঠানো
  }
};

// GET single user by ID
export const getSingleUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id); // ID অনুযায়ী user
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error); // 👉 নতুন
  }
};

// POST new user
export const createUser = async (req, res, next) => {
  try {
    // 👉 নতুন: Joi validate
    await userSchema.validateAsync(req.body, { abortEarly: false });

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    next(error); // 👉 নতুন
  }
};

// PUT update user
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    // 👉 নতুন: Joi validate
    await userSchema.validateAsync(req.body, { abortEarly: false });

    const { name, email, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (error) {
    next(error); // 👉 নতুন
  }
};

// DELETE user
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted" });
  } catch (error) {
    next(error); // 👉 নতুন
  }
};



/*
import User from "../models/User.js"; // User model import
// GET all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // সব user আনা
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single user by ID
export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id); // ID অনুযায়ী user
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST new user
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
*/