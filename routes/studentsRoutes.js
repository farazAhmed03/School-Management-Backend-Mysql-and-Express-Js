const express = require("express");
const router = express.Router();
const {
  addStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  searchStudents
} = require("../controllers/studentController");

const { protect, restrictTo } = require("../middlewares/authMiddleware");

// Routes
router.post("/", protect, addStudent);
router.get("/", protect, getAllStudents);
router.get("/search", protect, searchStudents);
router.get("/:id", protect, getStudent);
router.put("/:id", protect, updateStudent);
router.delete("/:id", protect, deleteStudent);

module.exports = router;