const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const cors = require('cors');
const crypto = require('crypto');
const db = require('./conn/conn')

const app = express();
app.use(bodyParser.json());
app.use(cors());


// Define schemas
const transactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    gateway: { type: String },
    transactionId: { type: String },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
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
  key_id: 'rzp_test_7kbetSV9IQQW2J',
  key_secret: 'aqrnceFu4yxSUJ34SFBXZe7q',
});

// Route to initiate Razorpay payment
app.post('/payment/razorpay', async (req, res) => {
  const amount = req.body.amount;
  console.log(amount)

  try {
    const payment_capture = 1; 
    const options = {
      amount: amount * 100, 
      currency: 'INR',
      receipt: 'receipt#1',
    };
    const order = await razorpay.orders.create(options);
    console.log(order)

    // Create a new transaction record
    const transaction = new Transaction({
      amount: amount,
      gateway: 'razorpay',
      transactionId: order.id,
      status: 'pending',
    });

    await transaction.save();
    res.json(order);

  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
});

// Route to handle Razorpay payment callback
app.post('/payment/razorpay/callback', async (req, res) => {
    const { razorpay_payment_id, id, razorpay_signature } = req.body;
    console.log("razorpay_payment_id ",razorpay_payment_id)
    console.log("razorpay_order_id ",req.body)
    console.log(" razorpay_signature ", razorpay_signature)

    if (!razorpay_payment_id || !id || !razorpay_signature) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest('hex');
  
    if (generated_signature === razorpay_signature) {
      try {
        // Update the transaction status to 'completed'
        const transaction = await Transaction.findOneAndUpdate(
          { transactionId: razorpay_order_id },
          { status: 'completed' },
          { new: true }
        );
  
        if (transaction) {
          // Update user's subscription status
          await User.findByIdAndUpdate(transaction.user, { subscriptionStatus: true });
  
          res.json({ status: 'Payment verified successfully', razorpay_payment_id });
        } else {
          res.status(404).json({ error: 'Transaction not found' });
        }
      } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ error: 'Failed to update transaction' });
      }
    } else {
      res.status(400).json({ status: 'Payment verification failed' });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
