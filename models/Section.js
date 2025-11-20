const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Class = require("./Class");

const Section = sequelize.define("Section", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Relationship: Class has many Sections
Class.hasMany(Section, { onDelete: "CASCADE" });
Section.belongsTo(Class);

module.exports = Section;