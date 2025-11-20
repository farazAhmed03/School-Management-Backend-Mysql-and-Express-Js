const express = require("express");
const router = express.Router();
const { createOperator, getAllOperators } = require("../controllers/operatorController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

// Routes
router.post("/", protect, restrictTo("ADMIN"), createOperator);
router.get("/", protect, restrictTo("ADMIN"), getAllOperators);

module.exports = router;