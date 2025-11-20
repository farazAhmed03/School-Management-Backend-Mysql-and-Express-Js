const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  photo: {
    type: DataTypes.STRING,
    defaultValue: "default.jpg"
  },

  role: {
    type: DataTypes.ENUM("ADMIN", "COMPUTER_OPERATOR"),
    allowNull: false
  },

  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },

  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: "Users", key: "id" }
  },

  resetPasswordToken: DataTypes.STRING,
  resetPasswordExpire: DataTypes.DATE
}, {
  timestamps: true
});

module.exports = User;