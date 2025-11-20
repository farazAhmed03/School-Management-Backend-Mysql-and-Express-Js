const Fee = require("../models/Fee");
const Student = require("../models/Student");

// Add Fee Challan (Monthly)
const addFee = async (req, res) => {
  const { studentId, amount, month, dueDate } = req.body;

  try {
    if (!studentId || !amount || !month) {
      return res.status(400).json({ msg: "Student, amount and month required" });
    }

    const student = await Student.findByPk(studentId);
    if (!student) return res.status(404).json({ msg: "Student not found" });

    const fee = await Fee.create({
      studentId,
      amount,
      month,
      dueDate: dueDate || null,
      status: "Unpaid",
      paidAmount: 0,
      remainingAmount: amount
    });

    res.status(201).json({
      msg: "Fee challan generated",
      fee
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Pay Fee (Full or Partial)
const payFee = async (req, res) => {
  const { feeId, paidAmount } = req.body;

  try {
    const fee = await Fee.findByPk(feeId);
    if (!fee) return res.status(404).json({ msg: "Fee record not found" });

    if (fee.status === "Paid") {
      return res.status(400).json({ msg: "Fee already paid" });
    }

    const newPaid = (fee.paidAmount || 0) + paidAmount;
    const remaining = fee.amount - newPaid;

    let status = "Unpaid";
    if (remaining <= 0) status = "Paid";
    else if (newPaid > 0) status = "Partial";

    await fee.update({
      paidAmount: newPaid,
      remainingAmount: remaining > 0 ? remaining : 0,
      status,
      paidDate: new Date()
    });

    res.json({
      msg: "Payment recorded successfully",
      fee
    });

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get Student Fee History
const getStudentFees = async (req, res) => {
  const { studentId } = req.params;

  try {
    const fees = await Fee.findAll({
      where: { studentId },
      order: [["month", "DESC"]]
    });
    res.json(fees);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get All Pending Fees
const getPendingFees = async (req, res) => {
  try {
    const fees = await Fee.findAll({
      where: { status: ["Unpaid", "Partial"] },
      include: [{ model: Student, attributes: ["name", "rollNo"] }],
      order: [["dueDate", "ASC"]]
    });
    res.json(fees);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  addFee,
  payFee,
  getStudentFees,
  getPendingFees
};