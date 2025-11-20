const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./Student");

const Fee = sequelize.define("Fee", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },

  paidAmount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  remainingAmount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },

  status: {
    type: DataTypes.ENUM("Paid", "Unpaid", "Partial"),
    defaultValue: "Unpaid"
  },

  month: DataTypes.STRING,
  dueDate: DataTypes.DATEONLY,
  paidDate: DataTypes.DATEONLY
});

Fee.belongsTo(Student);
Student.hasMany(Fee);

module.exports = Fee;