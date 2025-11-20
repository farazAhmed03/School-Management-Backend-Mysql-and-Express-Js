const express = require("express");
const router = express.Router();
const {
  addClass,
  getAllClasses,
  addSection,
  getSectionsByClass,
  getAllSections
} = require("../controllers/classSectionController");

const { protect } = require("../middlewares/authMiddleware");

// Routes
router.post("/class", protect, addClass);
router.get("/classes", protect, getAllClasses);

router.post("/section", protect, addSection);
router.get("/sections", protect, getAllSections);
router.get("/sections/:classId", protect, getSectionsByClass);

module.exports = router;