
const { body } = require("express-validator");

exports.registerValidation = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 6 characters"),
  body("role")
    .isIn(["admin", "operator"])
    .withMessage("Role must be either admin or operator"),
];

exports.loginValidation = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password is required"),
];
