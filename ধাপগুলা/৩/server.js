import express from "express"; // Express import
import dotenv from "dotenv";     // .env ফাইলের জন্য
import connectDB from "./config/db.js"; // DB কানেকশন
import userRoutes from "./routes/userRoutes.js"; // User routes
import cors from "cors";         // 2 CORS ম্যানেজ করার জন্য
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js"; // 👉3

dotenv.config();
connectDB(); 

const app = express();
app.use(express.json());              //  json ডেটা পার্স করার জন্য
//2. CORS সেটআপ
app.use(
  cors({
    origin: "http://localhost:5173",  // React Vite এর origin
    credentials: true,                // কুকি/টোকেন allow করা
  })
);


app.get("/", (req, res) => {
  res.send("Server is running"); // মূল পেজে এই মেসেজ দেখাবে
}); 

// Routes
app.use("/api/users", userRoutes); 

//3 👉 Error Middleware গুলো সব রাউটের পরে বসাতে হবে
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
