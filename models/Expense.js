const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Staff = require("./Staff");

const Expense = sequelize.define("Expense", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM("Staff_Salary", "Utility_Bill", "Maintenance", "Other"),
    defaultValue: "Other"
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: "Expenses"
});

// ASSOCIATION — SIRF EK HI BAR!
Expense.belongsTo(Staff, { foreignKey: "staffId", as: "staff" });
Staff.hasMany(Expense, { foreignKey: "staffId", as: "expenses" });

module.exports = Expense;