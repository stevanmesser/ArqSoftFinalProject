import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
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
