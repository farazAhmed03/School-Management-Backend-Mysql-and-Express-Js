
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function createAdmin() {
  try {
    // Tables sync without dropping data
    await sequelize.sync();

    // Check if admin already exists
    const admin = await User.findOne({ where: { username: "admin" } });
    if (admin) {
      console.log("Admin already exists in DB!");
      console.log("Username:", admin.username);
      return process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create new admin
    const newAdmin = await User.create({
      username: "admin",
      password: hashedPassword,
      fullName: "Super Administrator",
      role: "ADMIN",
      createdBy: null,
      isActive: true 
    });

    console.log("Admin created successfully!");
    console.log("Username: admin");
    console.log("Password: admin123");

  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    process.exit();
  }
}

createAdmin();
