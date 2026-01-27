const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  reviews: [
    {
      user: { type: String },
      comment: { type: String },
      rating: { type: Number },
    }
  ],
  image: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true }
    }
  ],
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
