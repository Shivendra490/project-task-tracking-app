const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
exports.verifyAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token?.trim()) {
      res.status(401).json({ message: "Access Denied" });
      return;
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    req.userId = decodedToken.userId;
    req.email = decodedToken.email;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
