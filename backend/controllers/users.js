const User = require("../models/users");
const jwt = require("jsonwebtoken");
const {
  sendVerificationCodeViaEmail,
  verifyCodeViaEmail,
} = require("../helpers/emailVerification");
const { encrypt } = require("../helpers/encryption");

const initiateRegister = async (req, res) => {
  const { value, type } = req.body;
  const existingUser = await User.findOne(
    type === "email" ? { email: value } : { mobile_phone: value }
  );

  if (existingUser)
    return res.status(400).json({ message: "User already exists!" });

  const verificationId =
    type === "email"
      ? await sendVerificationCodeViaEmail(value)
      : await sendVerificationCode(type, value);

  if (!verificationId)
    return res.status(400).json({ message: "Error sending OTP" });

  res.json({
    message: "Verification code sent!",
    verificationId: verificationId._id,
  });
};

const create = async (req, res) => {
  try {
    const { email, mobile_phone, password, token, verificationId } = req.body;
    if (!/^[0-9]+$/.test(token))
      return res.status(400).json({ message: "Invalid OTP" });

    if (await User.findOne({ $or: [{ email }, { mobile_phone }] }))
      return res.status(400).json({ message: "User already exists" });

    const isVerified = email
      ? await verifyCodeViaEmail(verificationId, token, email)
      : false;
    if (!isVerified) return res.status(400).json({ message: "Incorrect OTP" });

    const user = await User.create({
      email,
      mobile_phone,
      password: encrypt(password, "base64"),
    });
    const accessToken = encrypt(
      jwt.sign({ _id: user._id, email }, process.env.JWTSECRET),
      "base64"
    );

    res.json({ message: "User Created", user, accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { initiateRegister, create };
