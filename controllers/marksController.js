const Marks = require("../models/Marks");
const Student = require("../models/Student");
const Course = require("../models/Course");

// Add Marks (Computer Operator only)
const addMarks = async (req, res) => {
  const { studentId, courseId, obtainedMarks, totalMarks = 100, examType, remarks } = req.body;

  try {
    if (!studentId || !courseId || obtainedMarks === undefined || !examType) {
      return res.status(400).json({ msg: "Required fields missing" });
    }

    const student = await Student.findByPk(studentId);
    if (!student) return res.status(404).json({ msg: "Student not found" });

    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ msg: "Course not found" });

    if (obtainedMarks > totalMarks || obtainedMarks < 0) {
      return res.status(400).json({ msg: "Invalid marks" });
    }

    const marks = await Marks.create({
      studentId,
      courseId,
      obtainedMarks,
      totalMarks,
      examType,
      remarks: remarks || null,
      entryDate: new Date()
    });

    res.status(201).json({
      msg: "Marks added successfully",
      marks
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get Student Marks (by studentId)
const getStudentMarks = async (req, res) => {
  const { studentId } = req.params;

  try {
    const marks = await Marks.findAll({
      where: { studentId },
      include: [
        { model: Course, attributes: ["name", "code"] }
      ],
      order: [["examType", "ASC"], ["createdAt", "DESC"]]
    });

    res.json(marks);

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  addMarks,
  getStudentMarks
};