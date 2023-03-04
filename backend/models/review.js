const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  rate: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

module.exports = mongoose.model("Review", reviewSchema);
