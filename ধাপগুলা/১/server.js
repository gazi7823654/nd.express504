import express from "express"; // Express import
import dotenv from "dotenv";     // .env ফাইলের জন্য
import connectDB from "./config/db.js"; // DB কানেকশন
import userRoutes from "./routes/userRoutes.js"; // User routes

dotenv.config();
connectDB(); // 👉 নতুন

const app = express();
app.use(express.json()); // JSON পার্স করার জন্য

app.get("/", (req, res) => {
  res.send("Server is running"); // মূল পেজে এই মেসেজ দেখাবে
}); 

// Routes
app.use("/api/users", userRoutes); // 👉 নতুন

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
