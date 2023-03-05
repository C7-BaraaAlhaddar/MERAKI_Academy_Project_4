const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("mongoose-type-email");

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  address: { type: String },
  email: { type: mongoose.SchemaTypes.Email, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 5);
});

module.exports = mongoose.model("User", userSchema);
