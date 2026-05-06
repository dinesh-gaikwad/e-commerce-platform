const User = require("../models/User");

// ===============================
// 👑 ADMIN MIDDLEWARE
// ===============================
module.exports = async (req, res, next) => {
  try {
    // req.user authMiddleware se aata hai (JWT decoded)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only."
      });
    }

    next();

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};