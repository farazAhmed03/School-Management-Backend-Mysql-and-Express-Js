const express = require("express");
const router = express.Router();
const { addStaff, getAllStaff, updateStaff, deleteStaff } = require("../controllers/staffController");
const { protect } = require("../middlewares/authMiddleware");

// Routes
router.post("/", protect, addStaff);
router.get("/", protect, getAllStaff);
router.put("/:id", protect, updateStaff);
router.delete("/:id", protect, deleteStaff);

module.exports = router;