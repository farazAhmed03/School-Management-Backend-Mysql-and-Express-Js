const express = require("express");
const router = express.Router();
const { addFee, payFee, getStudentFees, getPendingFees } = require("../controllers/feeController");
const { protect } = require("../middlewares/authMiddleware");

// Routes
router.post("/", protect, addFee);
router.post("/pay", protect, payFee);
router.get("/student/:studentId", protect, getStudentFees);
router.get("/pending", protect, getPendingFees);

module.exports = router;