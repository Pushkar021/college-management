var { decrypt } = require("../helpers/encryption");
const jwt = require("jsonwebtoken");
const jwtpass = process.env.JWTSECRET;

const authvalidator = async (req, res, next) => {
  const authheaderEncrypted = req.headers.authorization;

  if (!authheaderEncrypted || !authheaderEncrypted.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Not allowed" });
  }

  try {
   
    const authheader = authheaderEncrypted.split(" ")[1]; 
    const decoded = await jwt.verify(authheader, jwtpass);
    req.userid = decoded._id;
    console.log(req.userid)
  next();
  } catch (e) {
    console.log("JWT Error:", e.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authvalidator;
