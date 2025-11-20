const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Create Computer Operator (Only Admin)
const createOperator = async (req, res) => {
  const { username, fullName, password } = req.body;

  try {
    if (!username || !fullName || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    if (password.length < 3) {
      return res.status(400).json({ msg: "Password must be at least 3 characters" });
    }

    const exists = await User.findOne({ where: { username } });
    if (exists) {
      return res.status(400).json({ msg: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const operator = await User.create({
      username,
      fullName,
      password: hashedPassword,
      role: "COMPUTER_OPERATOR",
      createdBy: req.user.id
    });

    res.status(201).json({
      msg: "Computer Operator created successfully",
      operator: {
        id: operator.id,
        username: operator.username,
        fullName: operator.fullName,
        role: operator.role
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get All Operators (Admin only)
const getAllOperators = async (req, res) => {
  try {
    const operators = await User.findAll({
      where: { role: "COMPUTER_OPERATOR" },
      attributes: ["id", "username", "fullName", "isActive", "createdAt"]
    });

    res.json(operators);

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  createOperator,
  getAllOperators
};