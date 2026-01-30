const express = require("express");
const { getAllOrders, markOrderDelivered, deleteOrder } = require("../controller/admin.controller");
const { protect, isAdmin } = require("../middleware/auth");

const router4 = express.Router();

router4.get("/all-orders", protect, isAdmin, getAllOrders);

router4.put("/order/:id/delivered", protect, isAdmin, markOrderDelivered);

router4.delete("/order/:id", protect, isAdmin, deleteOrder);

module.exports = router4;
