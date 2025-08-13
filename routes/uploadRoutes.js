
//6.2
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");

// সিঙ্গেল ফাইল আপলোড রুট
router.post("/", upload.single("image"), (req, res) => {
  res.json({
    message: "File uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
});

module.exports = router;


