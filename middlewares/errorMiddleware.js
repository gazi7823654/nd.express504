

/*
// ধাপ ৩ এ এই গুলা করুছিলাম কিন্তু ৫ এ আইসা কাইটা দিলাম। আপডেইটেট টা করতে হবে

//3.4 dn 👉 Not Found Middleware
const notFound = (req, res, next) => {
  const error = new Error(`🔍 Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// 👉 Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    // 👉 ডেভেলপমেন্ট মোডে হলে stack দেখাই
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
*/


//5.3
// 404 Not Found Middleware
const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
};

// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };


