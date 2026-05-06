// ===============================
// 🚨 GLOBAL ERROR HANDLER
// ===============================
const errorMiddleware = (err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // ===============================
  // 🧠 MONGOOSE ERRORS
  // ===============================

  // ❌ Invalid ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ID: ${err.value}`;
  }

  // ❌ Duplicate key
  if (err.code === 11000) {
    statusCode = 400;
    message = `Duplicate field value entered`;
  }

  // ❌ Validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map(val => val.message)
      .join(", ");
  }

  // ===============================
  // 🔐 JWT ERRORS
  // ===============================

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // ===============================
  // 🚀 RESPONSE
  // ===============================
  res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = errorMiddleware;