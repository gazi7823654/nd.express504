
//5.1 লগার মিডলওয়ার — প্রতিটি রিকোয়েস্ট ও রেসপন্স লগ করবে
const logger = (req, res, next) => {
  const start = Date.now(); // রিকোয়েস্ট শুরু টাইম

  res.on("finish", () => {
    const duration = Date.now() - start; // রিকোয়েস্ট প্রক্রিয়া সময়
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
    );
  });

  next(); // পরবর্তী মিডলওয়ার/রুটে যাও
};

module.exports = logger;
