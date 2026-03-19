const express = require("express");
const SSLCommerzPayment = require("sslcommerz-lts");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const Order = require("../models/order.model");

const router5 = express.Router();

// --- Step 1: Init Payment ---
router5.post("/payment", async (req, res) => {
  const { amount, name, email, phone, userId, cartItems, shippingAddress } = req.body;
  const transactionId = uuidv4();

  // Save pending order
  await Order.create({
    user: userId,
    orderItems: cartItems,
    totalPrice: amount,
    shippingAddress,
    paymentInfo: { id: transactionId, status: "pending" },
    orderStatus: "Pending",
  });

  const store_id = "testbox";
  const store_passwd = "qwerty";
  const is_live = false;

  const data = {
    total_amount: amount,
    currency: "BDT",
    tran_id: transactionId,
    // Backend handles SSLCommerz callbacks
    success_url: `http://localhost:3000/api/v1/payment/success/${transactionId}`,
    fail_url:    `http://localhost:3000/api/v1/payment/fail/${transactionId}`,
    cancel_url:  `http://localhost:3000/api/v1/payment/cancel/${transactionId}`,
    cus_name: name,
    cus_email: email,
    cus_phone: phone,
    shipping_method: "NO",
    product_name: "Test Product",
    product_category: "General",
    product_profile: "general",
  };

  try {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);
    res.json({ url: apiResponse.GatewayPageURL });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment init failed", error: err.message });
  }
});

// --- Step 2: Success ---
router5.post("/payment/success/:tran_id", async (req, res) => {
  const { tran_id } = req.params;
  const val_id = req.body?.val_id;

  if (!tran_id) return res.status(400).json({ message: "Transaction ID missing" });

  const store_id = "testbox";
  const store_passwd = "qwerty";

  try {
    let order;
    if (val_id) {
      // Validate with SSLCommerz
      const url = `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${store_id}&store_passwd=${store_passwd}&format=json`;
      const response = await axios.get(url);

      if (response.data.status === "VALID") {
        order = await Order.findOneAndUpdate(
          { "paymentInfo.id": tran_id },
          { "paymentInfo.status": "paid", orderStatus: "Processing" },
          { new: true }
        );
      } else {
        console.log("Payment verification failed", response.data);
        // Still redirect frontend but show failed
        return res.redirect(`http://localhost:5173/payment/fail/${tran_id}`);
      }
    } else {
      // Sandbox manual click
      order = await Order.findOneAndUpdate(
        { "paymentInfo.id": tran_id },
        { "paymentInfo.status": "paid", orderStatus: "Processing" },
        { new: true }
      );
    }

    // ✅ Redirect to frontend PaymentSuccess page
    return res.redirect(`http://localhost:5173/payment/success/${tran_id}`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// --- Step 3: Fail ---
router5.post("/payment/fail/:tran_id", async (req, res) => {
  const { tran_id } = req.params;
  if (tran_id) {
    await Order.findOneAndUpdate(
      { "paymentInfo.id": tran_id },
      { "paymentInfo.status": "failed", orderStatus: "Failed" }
    );
  }
  // Redirect frontend fail page
  return res.redirect(`http://localhost:5173/payment/fail/${tran_id}`);
});

// --- Step 4: Cancel ---
router5.post("/payment/cancel/:tran_id", async (req, res) => {
  const { tran_id } = req.params;
  if (tran_id) {
    await Order.findOneAndUpdate(
      { "paymentInfo.id": tran_id },
      { "paymentInfo.status": "cancelled", orderStatus: "Cancelled" }
    );
  }
  // Redirect frontend cancel page
  return res.redirect(`http://localhost:5173/payment/cancel/${tran_id}`);
});

module.exports = router5;