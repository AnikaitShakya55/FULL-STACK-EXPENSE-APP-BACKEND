const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const TOKEN_SECRET = "dfjkfdjdfkvkdfjbfbfggfgfvjg";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, TOKEN_SECRET);
    } catch (err) {
      return res.status(401).json({
        message: "Token is invalid or expired",
        success: false,
      });
    }

    console.log("decoded", decoded);

    // Find user using Sequelize
    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = isAuthenticated;
