const Product = require("../models/Product");


// ===============================
// 📦 GET ALL PRODUCTS (with search + filter + pagination)
// ===============================
exports.getProducts = async (req, res) => {
  try {
    const { keyword, min, max, page = 1, limit = 10 } = req.query;

    let query = {};

    // 🔍 Search
    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    // 💰 Price filter
    if (min || max) {
      query.price = {};
      if (min) query.price.$gte = Number(min);
      if (max) query.price.$lte = Number(max);
    }

    // 📄 Pagination
    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      count: products.length,
      total,
      page: Number(page),
      products
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// 📦 GET SINGLE PRODUCT
// ===============================
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      product
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// ➕ CREATE PRODUCT (ADMIN)
// ===============================
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// ✏️ UPDATE PRODUCT (ADMIN)
// ===============================
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      product
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// ❌ DELETE PRODUCT (ADMIN)
// ===============================
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product deleted"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};