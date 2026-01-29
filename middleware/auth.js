const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const dotenv = require("dotenv");
dotenv.config();

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Not an admin" });
    }

   
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { protect, isAdmin };