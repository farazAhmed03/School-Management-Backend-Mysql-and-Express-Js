const Fee = require("../models/Fee");
const Expense = require("../models/Expense");
const Student = require("../models/Student");
const sequelize = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.count();

    const totalFeeCollected = await Fee.sum("paidAmount") || 0;
    const totalPendingFee = await Fee.sum("remainingAmount") || 0;

    const totalExpenses = await Expense.sum("amount") || 0;

    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

    const thisMonthFee = await Fee.sum("paidAmount", {
      where: sequelize.where(
        sequelize.fn("DATE_FORMAT", sequelize.col("paidDate"), "%Y-%m"),
        currentMonth
      )
    }) || 0;

    const profit = totalFeeCollected - totalExpenses;

    res.json({
      totalStudents,
      totalFeeCollected,
      totalPendingFee,
      totalExpenses,
      profit,
      thisMonthIncome: thisMonthFee,
      message: "Dashboard stats fetched successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { getDashboardStats };