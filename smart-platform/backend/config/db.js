const mongoose = require("mongoose");

// 🔌 Connect Database Function
const connectDB = async () => {
  try {
    // Connect MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("MongoDB Connected ✅");

  } catch (error) {
    console.error("MongoDB Connection Error ❌:", error.message);

    // Exit process if DB fails
    process.exit(1);
  }
};

module.exports = connectDB;