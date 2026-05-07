const mongoose = require("mongoose");


// ===============================
// 📦 ORDER ITEM SCHEMA
// ===============================
const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});


// ===============================
// 📦 ORDER SCHEMA
// ===============================
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [orderItemSchema],

    total: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending"
    },

    // 💳 Payment Info
    razorpayOrderId: String,
    paymentId: String,

    // 📍 Shipping (optional)
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String
    }
  },
  {
    timestamps: true
  }
);


// ===============================
// 📊 INDEX FOR FAST QUERY
// ===============================
orderSchema.index({ userId: 1, createdAt: -1 });


module.exports = mongoose.model("Order", orderSchema);