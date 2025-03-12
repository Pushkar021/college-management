const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  validateVerifyInit,
  validateCreateUser,
} = require("../validators/users");
const userController = require("../controllers/users");
const authValidator = require("../middlewares/auth");
const userUpdate = require("../controllers/infoupdate");
const uploader = require("../controllers/uploadCode");

router.post(
  "/initiate/register",
  validateVerifyInit,
  userController.initiateRegister
);
const upload = multer({ dest: "uploads/" });
router.post("/", validateCreateUser, userController.create);
router.get("/hey", authValidator, userUpdate);
router.post("/upload", upload.single("file"), uploader);

module.exports = router;
