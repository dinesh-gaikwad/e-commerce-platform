const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart
} = require("../controllers/cartController");

router.get("/", auth, getCart);
router.post("/add", auth, addToCart);
router.post("/remove", auth, removeFromCart);
router.put("/update", auth, updateQuantity);
router.delete("/clear", auth, clearCart);

module.exports = router;