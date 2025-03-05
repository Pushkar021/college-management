const jwt = require("jsonwebtoken");
const { jwtpass } = process.env;

const authenticate = (role) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, jwtpass);

      if (decoded.role !== role) {
        return res.status(403).json({ message: "Access forbidden" });
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

module.exports = authenticate;
