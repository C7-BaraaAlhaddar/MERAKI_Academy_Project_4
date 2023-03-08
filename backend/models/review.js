const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    rate: { type: Number, min: 0, max: 5 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
