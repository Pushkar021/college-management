const express = require("express");
const router = express.Router();

const {
  validateVerifyInit,
  validateCreateUser,
} = require("../validators/users");
const userController = require("../controllers/users");
const authValidator = require("../middlewares/auth");
const userinfo = require("../controllers/userinfo");


router.post(
  "/initiate/register",
  validateVerifyInit,
  userController.initiateRegister
);

router.post("/", validateCreateUser, userController.create);
router.get("/userinfo", authValidator, userinfo);

module.exports = router;
