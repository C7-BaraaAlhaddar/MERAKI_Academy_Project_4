const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true, unique: true },
  img: { type: String },
});

module.exports = mongoose.model("Category", categorySchema);
