require("dotenv").config();
const express = require("express");
const router = express.Router();
const { User } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const saltround = 10;
const { jwtpass } = process.env;

// Validate input
const validateinput = (args) => {
  const schema = zod.object({
    enrollment: zod.number(),
    email: zod.string().email(),
     role: zod.enum(["student", "teacher"]),
    password: zod.string(),
  });

  return schema.safeParse(args);
};

// JWT token function
const token = async (args) => {
  return jwt.sign(args, jwtpass);
};

// Password hashing
const hashing = async (args) => {
  try {
    return await bcrypt.hash(args, saltround);
  } catch (e) {
    throw e;
  }
};

router.post("/", async (req, res) => {
  const { enrollment, email,role,password } = req.body;
  const parse = validateinput(req.body);

  if (!parse.success) {
    return res
      .status(400)
      .json({ msg: "Invalid input", errors: parse.error.errors });
  }

  try {
    const existuser = await User.findOne({ enrollment });
    if (existuser) {
      return res.status(400).json({ msg: "User already exists!" });
    }
      if (role === "student" && !enrollment) {
        return res
          .status(400)
          .json({ message: "Enrollment number is required for students!" });
      }

    const hashedpass = await hashing(password);
    const newUser = new User({ enrollment, email, password: hashedpass,role });

    await newUser.save();
    const jwttoken = await token({ _id:newUser._id , email , role});

    res.status(201).json({
      msg: "User created successfully",
      jwt: jwttoken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
