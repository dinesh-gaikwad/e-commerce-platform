// ===============================
// ✅ SUCCESS RESPONSE
// ===============================
exports.sendSuccess = (res, data = {}, message = "Success") => {
  return res.status(200).json({
    success: true,
    message,
    data
  });
};


// ===============================
// ❌ ERROR RESPONSE
// ===============================
exports.sendError = (res, message = "Error", status = 500) => {
  return res.status(status).json({
    success: false,
    message
  });
};


// ===============================
// ⚡ ASYNC HANDLER (no try-catch)
// ===============================
exports.asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};


// ===============================
// 📄 PAGINATION HELPER
// ===============================
exports.getPagination = (req) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};


// ===============================
// 🔍 SEARCH HELPER
// ===============================
exports.getSearchQuery = (keyword, fields = []) => {
  if (!keyword) return {};

  return {
    $or: fields.map(field => ({
      [field]: { $regex: keyword, $options: "i" }
    }))
  };
};


// ===============================
// 🔐 GENERATE RANDOM TOKEN
// ===============================
exports.generateToken = () => {
  return Math.random().toString(36).substring(2) + Date.now();
};


// ===============================
// 🧮 FORMAT PRICE
// ===============================
exports.formatPrice = (price) => {
  return `₹${Number(price).toLocaleString("en-IN")}`;
};


// ===============================
// 🧹 REMOVE SENSITIVE FIELDS
// ===============================
exports.cleanUser = (user) => {
  const obj = user.toObject ? user.toObject() : user;
  delete obj.password;
  return obj;
};