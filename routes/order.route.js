
const express = require("express");
const { getUserOrders, createOrder } = require("../controller/order.controller");
const { protect, isAdmin } = require("../middleware/auth");

const router2 = express.Router();

router2.get("/my-orders",protect,getUserOrders);

router2.post("/createOrder",protect,createOrder);

module.exports = router2;