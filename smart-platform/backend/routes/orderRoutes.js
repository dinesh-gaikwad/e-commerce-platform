const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  createPaymentOrder,
  verifyPayment,
  getPaymentDetails
} = require("../controllers/paymentController");

router.post("/create", auth, createPaymentOrder);
router.post("/verify", auth, verifyPayment);
router.get("/:id", auth, getPaymentDetails);

module.exports = router;