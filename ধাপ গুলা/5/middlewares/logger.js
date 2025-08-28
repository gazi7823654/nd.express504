//5.1
// middlewares/logger.js
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`); // 👉 কোন route call হচ্ছে লগ
  next(); // 👉 next middleware বা route handler এ যাবে
};

export default logger;
