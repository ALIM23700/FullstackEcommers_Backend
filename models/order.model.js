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
      id: { type: String },          // transactionId
      status: { type: String },      // pending / paid / failed
    },
    totalPrice: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Delivered"], // Added "Pending"
      default: "Pending",
      required: true,
    },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);