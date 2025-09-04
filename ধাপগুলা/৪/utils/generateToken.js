import jwt from "jsonwebtoken";

// JWT generate function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d", // 👉 .env থেকে expire
  });
};

export default generateToken;
