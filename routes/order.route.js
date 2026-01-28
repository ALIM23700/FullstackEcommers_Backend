
const express = require("express");
const { getUserOrders, createOrder } = require("../controller/order.controller");

const router2 = express.Router();

router2.get("/my-orders",getUserOrders);

router2.post("/createOrder",createOrder);

module.exports = router2;