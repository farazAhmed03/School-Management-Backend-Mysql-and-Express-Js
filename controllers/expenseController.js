const Expense = require("../models/Expense");
const Staff = require("../models/Staff");

// Add Expense (Salary or Other)
const addExpense = async (req, res) => {
  const { title, amount, type, staffId, date, description } = req.body;

  try {
    if (!title || !amount || !type) {
      return res.status(400).json({ msg: "Title, amount and type required" });
    }

    const expense = await Expense.create({
      title,
      amount,
      type,
      staffId: staffId || null,
      date: date || new Date(),
      description: description || null
    });

    res.status(201).json({
      msg: "Expense added successfully",
      expense
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get All Expenses
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      include: [{ model: Staff, attributes: ["name", "designation"] }],
      order: [["date", "DESC"]]
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { addExpense, getAllExpenses };