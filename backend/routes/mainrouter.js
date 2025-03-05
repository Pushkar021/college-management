const express = require("express");
const router = express.Router();
const userlogin = require("./userlogin")
const usersignup = require("./usersignup")




router.use("/signup",usersignup)
router.use("/login",userlogin)








module.exports = router;
