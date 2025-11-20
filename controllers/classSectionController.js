const Class = require("../models/Class");
const Section = require("../models/Section");
const Student = require("../models/Student");

// ================================= ADD CLASS =================================
const addClass = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ msg: "Class name is required" });
    }

    const classExists = await Class.findOne({ where: { name } });
    if (classExists) {
      return res.status(400).json({ msg: "Class already exists" });
    }

    const newClass = await Class.create({ name });

    res.status(201).json({
      msg: "Class created successfully",
      class: newClass
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ================================= GET ALL CLASSES WITH STUDENT COUNT =================================
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.findAll({
      attributes: {
        include: [[require("sequelize").fn("COUNT", require("sequelize").col("Students.id")), "studentCount"]]
      },
      include: [{ model: Student, attributes: [] }],
      group: ["Class.id"],
      order: [["name", "ASC"]]
    });

    res.json(classes);

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ================================= ADD SECTION =================================
const addSection = async (req, res) => {
  const { name, classId } = req.body;

  try {
    if (!name || !classId) {
      return res.status(400).json({ msg: "Section name and classId are required" });
    }

    const classExists = await Class.findByPk(classId);
    if (!classExists) {
      return res.status(404).json({ msg: "Class not found" });
    }

    const sectionExists = await Section.findOne({ where: { name, classId } });
    if (sectionExists) {
      return res.status(400).json({ msg: "Section already exists in this class" });
    }

    const section = await Section.create({ name, classId });

    res.status(201).json({
      msg: "Section created successfully",
      section
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ================================= GET SECTIONS BY CLASS ID =================================
const getSectionsByClass = async (req, res) => {
  const { classId } = req.params;

  try {
    const sections = await Section.findAll({
      where: { classId },
      order: [["name", "ASC"]]
    });

    res.json(sections);

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ================================= GET ALL SECTIONS WITH CLASS NAME =================================
const getAllSections = async (req, res) => {
  try {
    const sections = await Section.findAll({
      include: [{ model: Class, attributes: ["name"] }],
      order: [["Class.name", "ASC"], ["name", "ASC"]]
    });

    res.json(sections);

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  addClass,
  getAllClasses,
  addSection,
  getSectionsByClass,
  getAllSections
};