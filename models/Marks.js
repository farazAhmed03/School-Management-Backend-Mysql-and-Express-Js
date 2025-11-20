const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./Student");
const Course = require("./Course");

const Marks = sequelize.define("Marks", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  obtainedMarks: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 0 }
  },

  totalMarks: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  },

  grade: DataTypes.STRING,
  remarks: DataTypes.STRING,

  examType: {
    type: DataTypes.ENUM("Monthly", "Mid Term", "Final", "Test"),
    allowNull: false
  },

  entryDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
  
});

// Relations
Marks.belongsTo(Student);
Marks.belongsTo(Course);
Student.hasMany(Marks);
Course.hasMany(Marks);

module.exports = Marks;