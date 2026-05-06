const Cart = require("../models/Cart");
const Product = require("../models/Product");


// ===============================
// 🛒 GET USER CART
// ===============================
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    // 🆕 Create cart if not exists
    if (!cart) {
      cart = await Cart.create({
        userId: req.user.id,
        items: []
      });
    }

    res.json({
      success: true,
      cart
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// ➕ ADD TO CART
// ===============================
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        userId: req.user.id,
        items: []
      });
    }

    // 🔍 Check if item already exists
    const index = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (index > -1) {
      // 🔄 Update quantity
      cart.items[index].quantity += quantity;
    } else {
      // ➕ Add new item
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        quantity
      });
    }

    await cart.save();

    res.json({
      success: true,
      cart
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// ➖ REMOVE ITEM FROM CART
// ===============================
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();

    res.json({
      success: true,
      cart
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// 🔄 UPDATE ITEM QUANTITY
// ===============================
exports.updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      item => item.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.quantity = quantity;

    await cart.save();

    res.json({
      success: true,
      cart
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// 🧹 CLEAR CART
// ===============================
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      message: "Cart cleared"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};