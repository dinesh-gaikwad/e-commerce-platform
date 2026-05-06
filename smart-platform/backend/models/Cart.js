const mongoose = require("mongoose");


// ===============================
// 🛒 CART ITEM SCHEMA
// ===============================
const cartItemSchema = new mongoose.Schema({
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
    required: true,
    default: 1
  }
});


// ===============================
// 🛒 CART SCHEMA
// ===============================
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // one cart per user
    },

    items: [cartItemSchema],

    totalAmount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);


// ===============================
// 💰 AUTO CALCULATE TOTAL
// ===============================
cartSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  next();
});


module.exports = mongoose.model("Cart", cartSchema);