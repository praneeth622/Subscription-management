// models/User.js
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscriptionStatus: { type: Boolean, default: false },
  subscription: { type: ObjectId, ref: "subscriptions" },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("Subscriber", userSchema);
module.exports = User;
