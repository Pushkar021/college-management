const { check, body } = require("express-validator");
const prepareValidationError = require("../helpers/prepareValidationError.js");
const validateVerifyInit = [
    check("type", "type field is missing").exists(),
    check("type")
      .isIn(["email", "mobile_phone"])
      .withMessage("type must be mobile_phone | email"),
  
    check("value", "value field is required").exists(),
    check("value", "value field is required").notEmpty(),
  
    body("value").custom((value, { req }) => {
      if (req.body.type === "email") {
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(value)) {
          throw new Error("Invalid email format");
        }
        if (value.length > 352) {
          throw new Error("Email exceeds the maximum length of 352 characters");
        }
        return true;
      } else if (req.body.type === "mobile_phone") {
        const phoneRegex = /^\d{11}$/; 
        if (!phoneRegex.test(value)) {
          throw new Error("Invalid phone format.");
        }
        return true;
      }
      return true;
    }),
  
    (req, res, next) => {
      prepareValidationError(req, res, next);
    },
    
  ];
  const validateCreateUser = [
    check("verificationId", "verificationId field is missing").exists(),
    check("verificationId", "verificationId field is required").notEmpty(),
    check("token", "token field is missing").exists(),
    check("token", "token field is required").notEmpty(),
    check("password", "password field is missing").exists(),
    check("password", "password field is required").notEmpty(),
    check("password","Password must not contain spaces").not().matches(/\s/),
    check("password","Password must be 6-16 characters long").isLength({ min: 6, max: 16 }),
    check("password")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character")
    .not(),
    check("mobile_phone", "mobile_phone is required").optional().notEmpty(),
    check("email", "email is invalid").optional().isEmail(),
    (req, res, next) => {
      prepareValidationError(req, res, next);
    },
  ];
  const validateAuthenticate = [
    check("password", "password field is missing").exists(),
    check("password", "password field is required").notEmpty(),
    check("userType", "userType field is missing").exists(),
    check("userType")
      .isIn(["user", "admin"])
      .withMessage("userType must be user | admin"),
    (req, res, next) => {
      prepareValidationError(req, res, next);
    },
  ];

  module.exports = {
    validateVerifyInit,
    validateAuthenticate,
    validateCreateUser
  };