const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Class = require("./Class");

const Subject = sequelize.define("Subject", {
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

Class.hasMany(Subject);
Subject.belongsTo(Class);

module.exports = Subject;
