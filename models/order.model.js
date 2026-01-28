const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    paymentInfo: {
      id: { type: String, required: true },
      status: { type: String, required: true },
    },
    totalPrice: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    orderStatus: {
      type: String,
      enum: ["Processing", "Delivered"],
      default: "Processing",
      required: true,
    },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
