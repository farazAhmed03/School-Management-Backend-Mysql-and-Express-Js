const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d";

// Login
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please Fill Required Fields!" });
  }

  try {
    const user = await User.findOne({ where: { username, isActive: true } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout 
const logout = (req, res) => {
  res.json({ message: "Logout successful" });
};

// Get logged in user profile
const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "username", "fullName", "role"]
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// Forgot Password -
const forgotPassword = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "User doesnot exists!" });
    }

    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Print OTP to console 
    console.log(`OTP for ${username}: ${resetToken}`);

    res.json({
      message: "OTP Sent",
      otp: resetToken
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: "Require Token and New Password" });
  }

  try {
    // Hash the token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { [require("sequelize").Op.gt]: Date.now() }
      }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;
    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Profile 
const updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User doesnot exists" });
    }

    const { fullName } = req.body;
    if (fullName) user.fullName = fullName;

    if (req.file) {
      user.photo = req.file.filename;
    }

    await user.save();

    res.json({
      message: "Profile updated",
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        photo: user.photo,
        role: user.role
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updateProfile
};