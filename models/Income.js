const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Income = sequelize.define("Income", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  source: {
    type: DataTypes.STRING,
    allowNull: false
  },

  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Income;
