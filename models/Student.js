const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Class = require("./Class");
const Section = require("./Section");

const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rollNo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fatherName: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.TEXT,
  admissionDate: DataTypes.DATEONLY
});

// Relations
Student.belongsTo(Class);
Student.belongsTo(Section);
Class.hasMany(Student);
Section.hasMany(Student);

module.exports = Student;