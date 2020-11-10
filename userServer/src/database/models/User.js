import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('users', UserSchema);
