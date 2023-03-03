const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  brand: { type: String },
  img: { type: String },
  description: { type: String },
  color: { type: String },
  quantity: { type: Number },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

module.exports("Product", productSchema);
