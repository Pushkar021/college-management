require("dotenv").config();
const express = require("express");
const router = express.Router();
const { User } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { jwtpass } = process.env;

// Validate input
const validateinput = (args) => {
  const schema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
    role: zod.enum(["student", "teacher"])
  });

  return schema.safeParse(args);
};

// JWT token function
const token = async (args) => {
  return jwt.sign(args, jwtpass); 
};

// Login route
router.post("/", async (req, res) => {
    const { email, password, role } = req.body;
  const parse = validateinput(req.body); 

  if (!parse.success) {
    return res
      .status(400)
      .json({ message: "Invalid input", errors: parse.error.errors });
  }


  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist!" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const jwttoken = await token({ email , role,_id:existingUser._id}); 

    res.status(200).json({ message: "Login successful", jwt: jwttoken});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
