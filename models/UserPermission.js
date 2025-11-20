const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const UserPermission = sequelize.define("UserPermission", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  canAddStudent: { type: DataTypes.BOOLEAN, defaultValue: false },
  canEditStudent: { type: DataTypes.BOOLEAN, defaultValue: false },
  canDeleteStudent: { type: DataTypes.BOOLEAN, defaultValue: false },
  canAddMarks: { type: DataTypes.BOOLEAN, defaultValue: false },
  canViewMarks: { type: DataTypes.BOOLEAN, defaultValue: true },
  canManageFee: { type: DataTypes.BOOLEAN, defaultValue: false },
  canAddStaff: { type: DataTypes.BOOLEAN, defaultValue: false },
  canViewReports: { type: DataTypes.BOOLEAN, defaultValue: true },
  canAddCourse: { type: DataTypes.BOOLEAN, defaultValue: false },
  canManageUsers: { type: DataTypes.BOOLEAN, defaultValue: false } // Admin only true
});

User.hasOne(UserPermission);
UserPermission.belongsTo(User);

module.exports = UserPermission;