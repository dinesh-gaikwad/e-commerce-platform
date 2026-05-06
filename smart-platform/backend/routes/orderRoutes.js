const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  updateOrderStatus
} = require("../controllers/orderController");

router.post("/", auth, createOrder);
router.get("/my", auth, getMyOrders);
router.get("/:id", auth, getOrderById);
router.put("/cancel/:id", auth, cancelOrder);

// Admin
router.put("/status/:id", auth, admin, updateOrderStatus);

module.exports = router;