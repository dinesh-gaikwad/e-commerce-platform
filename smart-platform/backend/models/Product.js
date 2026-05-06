const mongoose = require("mongoose");


// ===============================
// ⭐ REVIEW SCHEMA (OPTIONAL)
// ===============================
const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: String
}, { timestamps: true });


// ===============================
// 📦 PRODUCT SCHEMA
// ===============================
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true
    },

    description: {
      type: String,
      required: [true, "Description is required"]
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0
    },

    stock: {
      type: Number,
      required: true,
      default: 0
    },

    category: {
      type: String,
      required: true
    },

    image: {
      type: String,
      default: ""
    },

    // ⭐ Ratings
    rating: {
      type: Number,
      default: 0
    },

    numReviews: {
      type: Number,
      default: 0
    },

    reviews: [reviewSchema]
  },
  {
    timestamps: true
  }
);


// ===============================
// 📊 INDEX FOR SEARCH
// ===============================
productSchema.index({ name: "text", description: "text" });


module.exports = mongoose.model("Product", productSchema);