const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Class = require("./Class");

const Course = sequelize.define("Course", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  code: DataTypes.STRING 
});

// One Class can have many Courses
Class.hasMany(Course);
Course.belongsTo(Class);

module.exports = Course;