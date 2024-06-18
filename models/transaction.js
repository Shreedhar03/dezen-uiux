import { Schema, model, models } from 'mongoose';

const TransactionSchema = new Schema({
  memecoin_id: {
    type: Schema.Types.ObjectId,
    ref: 'Memecoin',
    required: true,
  },
  transaction_type: {
    type: String,
    required: true,
    enum: ['buy', 'sell'],
  },
  token_amount: {
    type: Number,
    required: true,
  },
  price_per_token_start: {
    type: Number,
    required: true,
  },
  price_per_token_end: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  supply_before_transaction: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

const Transaction = models.Transaction || model('Transaction', TransactionSchema);

export default Transaction;
