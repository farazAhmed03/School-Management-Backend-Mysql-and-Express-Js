

const OperatorPrivileges = require("../models/OperatorPrivileges");

module.exports = (field) => {
  return async (req, res, next) => {
    if (req.user.role !== "Operator") return next();

    const privileges = await OperatorPrivileges.findOne({ where: { UserId: req.user.id } });

    if (!privileges[field]) {
      return res.status(403).json({ message: "No permission" });
    }

    next();
  };
};
