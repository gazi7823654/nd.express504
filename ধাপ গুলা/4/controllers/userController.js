/*
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
*/
// 4.3


// controllers/userController.js
import User from "../models/User.js"; // 👉 ইউজার মডেল
import generateToken from "../utils/generateToken.js"; // 👉 টোকেন জেনারেট

// রেজিস্টার ইউজার
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "সব ফিল্ড পূরণ করুন" }); // 👉 ফিল্ড চেক
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "ইমেল ইতিমধ্যেই আছে" });
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), // 👉 JWT
    });
  } else {
    res.status(400).json({ message: "ইউজার তৈরি করা যায়নি" });
  }
};

// লগইন ইউজার
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "ইমেল এবং পাসওয়ার্ড দিতে হবে" });
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), // 👉 JWT
    });
  } else {
    res.status(401).json({ message: "ইমেল বা পাসওয়ার্ড ভুল" });
  }
};

// প্রোটেক্টেড ইউজার প্রোফাইল
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: "ইউজার পাওয়া যায়নি" });
  }
};
