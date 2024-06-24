const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const cors = require('cors');
const db = require('./conn/conn')

const app = express();
app.use(bodyParser.json());
app.use(cors());


// Define schemas
const transactionSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'users' },
  subscription: { type: ObjectId, ref: 'subscriptions' },
  amount: { type: Number, required: true },
  gateway: { type: String },
  transactionId: { type: String },
  status: { type: String, enum: ['pending', 'completed', 'failed'] },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  subscriptionStatus: { type: Boolean, default: false },
  subscription: { type: ObjectId, ref: 'subscriptions' },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
const User = mongoose.model('User', userSchema);

// Razorpay instance
const razorpay = new Razorpay({
  key_id: 'rzp_test_zgAAsQPNkntJ1',
  key_secret: 'Qhj1owYbcPBUWhAgBP8MIgnc',
});

// Route to initiate Razorpay payment
app.post('/payment/razorpay', async (req, res) => {
  const amount = req.body.amount;

  try {
    const payment_capture = 1; // Capture payment immediately
    const options = {
      amount: amount * 100, // Convert amount to paisa
      currency: 'INR',
      receipt: 'receipt#1',
    };

    const response = await razorpay.orders.create(options);
    res.json(response);

  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
});

// Route to handle Razorpay payment callback
app.post('/payment/razorpay/callback', async (req, res) => {
  const paymentId = req.body.payment_id;

  try {
    // Verify payment using Razorpay API
    const payment = await razorpay.payments.fetch(paymentId);

    // Example: Create transaction record in MongoDB
    const transaction = new Transaction({
      user: ObjectId('user_id_from_jwt_or_session'), // Replace with actual user ID
      subscription: ObjectId('subscription_id'), // Replace with actual subscription ID
      amount: payment.amount / 100, // Convert back to currency unit
      gateway: 'Razorpay',
      transactionId: payment.id,
      status: 'completed', // Assuming payment is verified
    });

    await transaction.save();

    // Update user subscription status
    await User.findByIdAndUpdate(
      ObjectId('user_id_from_jwt_or_session'), // Replace with actual user ID
      { subscriptionStatus: true, subscription: ObjectId('subscription_id') }, // Replace with actual subscription ID
      { new: true }
    );

    res.json({ success: true });

  } catch (error) {
    console.error('Error processing Razorpay payment:', error);
    res.status(500).json({ success: false, error: 'Payment processing failed' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
