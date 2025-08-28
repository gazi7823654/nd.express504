//4.1 utils/generateToken.js
import jwt from "jsonwebtoken"; // 👉 JWT লাইব্রেরি ইমপোর্ট

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE, // 👉 টোকেনের মেয়াদ .env থেকে
  });
};

export default generateToken;

