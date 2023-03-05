const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orders: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    ],
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    shipping: { type: Boolean, required: true },
    successfulPayment: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
