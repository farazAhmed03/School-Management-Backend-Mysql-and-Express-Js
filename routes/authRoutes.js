const express = require("express");
const router = express.Router();
// const multer = require("multer");
const { 
  login, 
  logout, 
  getMe, 
  forgotPassword, 
  resetPassword, 
  updateProfile 
} = require("../controllers/authController");

const { protect } = require("../middlewares/authMiddleware");
const multer = require("../middlewares/multer");
const path = require("path");

router.post("/login", login);
router.post("/logout", protect, logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", protect, resetPassword);

router.get("/me", protect, getMe);
router.put("/profile", protect, multer.single("photo"), updateProfile);


module.exports = router;