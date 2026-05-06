const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");


// ===============================
// 📊 ADMIN DASHBOARD
// ===============================
exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    // 💰 Total Revenue
    const totalRevenue = orders.reduce((sum, order) => {
      return sum + (order.total || 0);
    }, 0);

    res.json({
      success: true,
      stats: {
        users: totalUsers,
        products: totalProducts,
        orders: totalOrders,
        revenue: totalRevenue
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ===============================
// 👥 GET ALL USERS
// ===============================
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      users
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// 📦 GET ALL ORDERS
// ===============================
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// 🛒 GET ALL PRODUCTS
// ===============================
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json({
      success: true,
      products
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// ➕ ADD PRODUCT (ADMIN)
// ===============================
exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      image
    });

    res.json({
      success: true,
      product
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// ✏️ UPDATE PRODUCT
// ===============================
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      product: updated
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// ❌ DELETE PRODUCT
// ===============================
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Product deleted"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// 🔄 UPDATE ORDER STATUS
// ===============================
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};