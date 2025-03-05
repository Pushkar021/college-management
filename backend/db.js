require("dotenv").config();
const { dburl } = process.env;
const mongoose = require("mongoose");
mongoose.connect(dburl);

//schema defination
const userSchema = mongoose.Schema({
  enrollment: { type: Number, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher"], required: true },
});

const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};
