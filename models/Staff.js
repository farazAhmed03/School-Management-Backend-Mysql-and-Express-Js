const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Staff = sequelize.define("Staff", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  fatherName: DataTypes.STRING,
  cnic: {
    type: DataTypes.STRING(15),
    unique: true
  },

  phone: DataTypes.STRING,
  address: DataTypes.TEXT,

  designation: {
    type: DataTypes.STRING, // Teacher, Peon, Clerk, Security, Accountant etc
    allowNull: false
  },

  salary: DataTypes.DECIMAL(10, 2),
  joiningDate: DataTypes.DATEONLY
  
});



module.exports = Staff;