const Order = require("../models/Order");
const Cart = require("../models/Cart");


// ===============================
// 📦 CREATE ORDER (FROM CART)
// ===============================
exports.createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 💰 Calculate total
    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const order = await Order.create({
      userId: req.user.id,
      items: cart.items,
      total: totalAmount,
      status: "pending"
    });

    // 🧹 Clear cart after order
    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// 📦 GET USER ORDERS
// ===============================
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// 📦 GET SINGLE ORDER
// ===============================
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      success: true,
      order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// ❌ CANCEL ORDER
// ===============================
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "delivered") {
      return res.status(400).json({
        message: "Delivered order cannot be cancelled"
      });
    }

    order.status = "cancelled";
    await order.save();

    res.json({
      success: true,
      message: "Order cancelled",
      order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// 🔄 UPDATE ORDER STATUS (ADMIN)
// ===============================
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
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