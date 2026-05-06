const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");


// ===============================
// 💳 CREATE PAYMENT ORDER
// ===============================
exports.createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount required" });
    }

    const options = {
      amount: amount * 100, // ₹ to paisa
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// 🔐 VERIFY PAYMENT
// ===============================
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }

    // ✅ Update order (optional)
    await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        paymentId: razorpay_payment_id,
        status: "paid"
      }
    );

    res.json({
      success: true,
      message: "Payment verified successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// 📜 GET PAYMENT DETAILS (OPTIONAL)
// ===============================
exports.getPaymentDetails = async (req, res) => {
  try {
    const paymentId = req.params.id;

    const payment = await razorpay.payments.fetch(paymentId);

    res.json({
      success: true,
      payment
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};