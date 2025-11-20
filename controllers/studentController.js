const Student = require("../models/Student");
const Class = require("../models/Class");
const Section = require("../models/Section");

// ==================== ADD STUDENT ====================
const addStudent = async (req, res) => {
  const {
    rollNo,
    name,
    fatherName,
    phone,
    address,
    admissionDate,
    classId,
    sectionId
  } = req.body;

  try {
    if (!rollNo || !name || !classId || !sectionId) {
      return res.status(400).json({ message: "Please Fill required Field!" });
    }

    const rollExists = await Student.findOne({ where: { rollNo, classId, sectionId } });
    if (rollExists) {
      return res.status(400).json({ message: "Student Already Exists with This registration Number!" });
    }

    const student = await Student.create({
      rollNo,
      name,
      fatherName: fatherName || null,
      phone: phone || null,
      address: address || null,
      admissionDate: admissionDate || new Date(),
      classId,
      sectionId
    });

    res.status(201).json({
      message: "Student Registered Successfully",
      student
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==================== GET ALL STUDENTS ====================
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [
        { model: Class, attributes: ["name"] },
        { model: Section, attributes: ["name"] }
      ],
      order: [["createdAt", "DESC"]]
    });

    res.json(students);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ==================== GET SINGLE STUDENT ====================
const getStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: [
        { model: Class, attributes: ["name"] },
        { model: Section, attributes: ["name"] }
      ]
    });

    if (!student) {
      return res.status(404).json({ message: "Student nahi mila" });
    }

    res.json(student);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ==================== UPDATE STUDENT ====================
const updateStudent = async (req, res) => {
  const { rollNo, name, fatherName, phone, address, classId, sectionId } = req.body;

  try {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student doesn't exist" });
    }

    // Check if rollNo is being updated to an existing one
    if (rollNo && rollNo !== student.rollNo) {
      const exists = await Student.findOne({ where: { rollNo, classId, sectionId } });
      if (exists) {
        return res.status(400).json({ message: "Student Already Exists with This registration Number!" });
      }
    }

    await student.update({
      rollNo: rollNo || student.rollNo,
      name: name || student.name,
      fatherName: fatherName || student.fatherName,
      phone: phone || student.phone,
      address: address || student.address,
      classId: classId || student.classId,
      sectionId: sectionId || student.sectionId
    });

    res.json({
      message: "Student Updated Successfully",
      student
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==================== DELETE STUDENT ====================
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student doesn't exist" });
    }

    await student.destroy();
    res.json({ message: "Student Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ==================== SEARCH STUDENT ====================
const searchStudents = async (req, res) => {
  const { q } = req.query; // q = name ya rollNo

  try {
    if (!q) {
      return res.status(400).json({ message: "Please provide a search query" });
    }

    const students = await Student.findAll({
      where: {
        [require("sequelize").Op.or]: [
          { name: { [require("sequelize").Op.like]: `%${q}%` } },
          { rollNo: { [require("sequelize").Op.like]: `%${q}%` } }
        ]
      },
      include: [
        { model: Class, attributes: ["name"] },
        { model: Section, attributes: ["name"] }
      ]
    });

    res.json(students);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  searchStudents
};