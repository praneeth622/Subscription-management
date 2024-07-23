// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  gateway: { type: String },
  transactionId: { type: String },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  userEmail: { type: String },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
