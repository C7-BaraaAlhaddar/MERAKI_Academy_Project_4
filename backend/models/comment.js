const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

module.exports = mongoose.model("Comment", commentSchema);
