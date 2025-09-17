// ./middlewares/logger.js
const logger = (req, res, next) => {     
  console.log(`${req.method} ${req.originalUrl}`)  // 👉 নতুন: প্রতিটি request এর মেথড আর URL লগ হবে
  next()                                          // 👉 নতুন: পরের middleware এ যাবে
}

export default logger  // 👉 নতুন: অন্য ফাইলে ইউজ করার জন্য এক্সপোর্ট
