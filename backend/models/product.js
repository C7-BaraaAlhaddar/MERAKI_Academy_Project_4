const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    brand: { type: String },
    img: { type: String },
    specs: { type: Object },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
