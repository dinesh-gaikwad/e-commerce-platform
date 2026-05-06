const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();


// ===============================
// 🔧 MIDDLEWARES
// ===============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🌍 CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

// 📜 Logger (dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


// ===============================
// 🏠 ROOT ROUTE
// ===============================
app.get("/", (req, res) => {
  res.send("🚀 E-Commerce API is running...");
});


// ===============================
// 🔗 ROUTES
// ===============================
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));


// ===============================
// ❌ 404 HANDLER
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


// ===============================
// 🚨 ERROR HANDLER (LAST)
// ===============================
app.use(errorMiddleware);


module.exports = app;