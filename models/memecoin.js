import { Schema, model, models } from 'mongoose';

const MemecoinSchema = new Schema({
  memecoin_address: {
    type: String,
    unique: [true, 'Memecoin address already exists'],
    required: [true, 'Memecoin address is required'],
    immutable: true,
  },
  creator_address: {
    type: String,
    required: [true, 'Creator address is required'],
    immutable: true,
  },
  logo: {
    type: String,
    required: [true, 'Logo is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  ticker: {
    type: String,
    required: [true, 'Ticker is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  twitter: {
    type: String,
  },
  telegram: {
    type: String,
  },
  website: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    immutable: true,
  }
});

const Memecoin = models.Memecoin || model('Memecoin', MemecoinSchema);

export default Memecoin;
