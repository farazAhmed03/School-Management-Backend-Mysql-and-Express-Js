const express = require("express");
const router = express.Router();
const { addMarks, getStudentMarks } = require("../controllers/marksController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

// Routes
router.post("/", protect, restrictTo("COMPUTER_OPERATOR"), addMarks);
router.get("/student/:studentId", protect, getStudentMarks);

module.exports = router;