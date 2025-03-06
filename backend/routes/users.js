const express = require("express");
const router = express.Router();
const {validateVerifyInit,validateCreateUser} = require("../validators/users")
const userController = require("../controllers/users"); 



router.post("/initiate/register",validateVerifyInit,userController.initiateRegister);
router.use("/",validateCreateUser,userController.create);
// router.post("/authenticate", validateVerifyInit, validateAuthenticate,checkDeviceID, userController.login);








module.exports = router;
