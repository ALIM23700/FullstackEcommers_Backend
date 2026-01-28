const Order = require("../models/order.model");

const createOrder = async (req, res) => {
  try {
    const { products, totalPrice, shippingAddress, paymentMethod } = req.body;

    if (!products || products.length === 0)
      return res.status(400).json({ success: false, message: "No products" });

    const order = await Order.create({
      user: req.user._id,
      orderItems: products.map((p) => ({
        name: p.name,
        price: p.price,
        quantity: p.quantity,
        product: p._id,
      })),
      totalPrice,
      shippingAddress,
      paymentInfo: {
        id: paymentMethod.id || "NA",
        status: paymentMethod.status || "Pending",
      },
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const markOrderDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.orderStatus = "Delivered";

    const updatedOrder = await order.save();
    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createOrder, getUserOrders, markOrderDelivered };
