import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    lowercase: true,
  },
  id: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  amountUSD: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['deposit', 'borrow', 'repay', 'withdraw']
  },
  symbol: String,
  decimals: Number
}, {
  timestamps: true
});

transactionSchema.index({ walletAddress: 1, timestamp: -1 });
transactionSchema.index({ id: 1 }, { unique: true });

export const Transaction = mongoose.model('Transaction', transactionSchema);