const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getDashboard,
  getUsers,
  getOrders,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  updateOrderStatus
} = require("../controllers/adminController");

router.get("/dashboard", auth, admin, getDashboard);
router.get("/users", auth, admin, getUsers);
router.get("/orders", auth, admin, getOrders);
router.get("/products", auth, admin, getProducts);

router.post("/product", auth, admin, addProduct);
router.put("/product/:id", auth, admin, updateProduct);
router.delete("/product/:id", auth, admin, deleteProduct);

router.put("/order/:id", auth, admin, updateOrderStatus);

module.exports = router;