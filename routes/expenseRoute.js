
const express = require("express");
const router = express.Router();
const { addExpense, getAllExpenses } = require("../controllers/expenseController");
const { protect } = require("../middlewares/authMiddleware");

// Routes
router.post("/", protect, addExpense);
router.get("/", protect, getAllExpenses);

module.exports = router;