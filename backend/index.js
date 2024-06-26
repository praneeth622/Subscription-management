const express = require("express");
const bodyParser = require("body-parser");
const razorpay = require("./Payment/Razorpay");
const Razorpay = require("razorpay");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const cors = require("cors");
const crypto = require("crypto");
const db = require("./conn/conn");

const app = express();
app.use(bodyParser.json());
app.use(cors());

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

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscriptionStatus: { type: Boolean, default: false },
  subscription: { type: ObjectId, ref: "subscriptions" },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
const User = mongoose.model("Subscriber", userSchema);

//creating user
app.post("/user", async (req, res) => {
  const { email, Id } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      user.password = Id;
      await user.save();
      res.json({ message: "User updated successfully" });
    } else {
      // Create new user
      try {
        user = new User({
          email,
          password: Id,
        });
        await user.save();
        res.json({ message: "User created successfully" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error in creting user" });
      }
    }
  } catch (error) {
    console.error("Error creating/updating user:", error);
    res.status(500).json({ error: "Failed to create/update user" });
  }
});

//checking subscribtion status
app.post("/user/subscription", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: email });
    }

    res.json({ subscriptionStatus: user.subscriptionStatus });
  } catch (error) {
    console.error("Error fetching subscription status:", error.message);
    res.status(500).json({ error: "Failed to fetch subscription status" });
  }
});

app.post("/payment/razorpay", async (req, res) => {
  const amount = req.body.amount;
  const userEmail = req.body.userId[0].emailAddress;
  console.log(amount);
  console.log(userEmail);

  try {
    const payment_capture = 1;
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt#1",
    };
    const order = await razorpay.orders.create(options);
    console.log(order);

    // Create a new transaction record
    const transaction = new Transaction({
      amount: amount,
      gateway: "razorpay",
      transactionId: order.id,
      status: "pending",
      userEmail: userEmail,
    });

    await transaction.save();
    res.json({ ...order, userEmail });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});

app.post("/payment/razorpay/callback", async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    userEmail,
  } = req.body;
  console.log("razorpay_payment_id ", razorpay_payment_id);
  console.log("razorpay_order_id ", razorpay_order_id);
  console.log(" razorpay_signature ", razorpay_signature);
  console.log("userEmail ", userEmail);

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // console.log(process.env.RAZORPAY_KEY_SECRET)
  const hmac = crypto.createHmac("sha256", "aqrnceFu4yxSUJ34SFBXZe7q");
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generated_signature = hmac.digest("hex");
  console.log("2");
  if (generated_signature === razorpay_signature) {
    try {
      const transaction = await Transaction.findOneAndUpdate(
        { transactionId: razorpay_order_id },
        { status: "completed" },
        { new: true }
      );
      console.log("3");
      if (transaction) {
        // Update user's subscription status
        const user = await User.findOneAndUpdate(
          { email: transaction.userEmail },
          { subscriptionStatus: true },
          { new: true }
        );
        if (user) {
          console.log("Subscription status updated for user:", user.email);
          res.json({
            status: "Payment verified successfully",
            razorpay_payment_id,
          });
        } else {
          console.error("User not found:", transaction.userEmail);
          res.status(404).json({ error: "User not found" });
        }
      } else {
        res.status(404).json({ error: "Transaction not found" });
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
      res.status(500).json({ error: "Failed to update transaction" });
    }
  } else {
    res.status(400).json({ status: "Payment verification failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
