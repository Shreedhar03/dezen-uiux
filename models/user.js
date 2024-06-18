import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  address: {
    type: String,
    unique: [true, 'Address already exists'],
    required: [true, 'Address is required'],
    immutable: true,
  },
  username: {
    type: String,
    unique: [true, 'Username already exists'],
    required: [true, 'Username is required'],
  },
  profilePicture: {
    type: String,
  },
  bio: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    immutable: true,
  }
});

const User = models.User || model('User', UserSchema);

export default User;
