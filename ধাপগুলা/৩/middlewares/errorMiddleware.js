// middlewares/errorMiddleware.js

// 👉 Not Found Middleware
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`); // 👉 ভুল রুট
  res.status(404);
  next(error);
};

// 👉 Global Error Handler Middleware
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // 👉 default 500
  res.status(statusCode);
  res.json({
    message: err.message,             // 👉 এরর মেসেজ
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // 👉 dev এ stacktrace দেখাবে
  });
};
