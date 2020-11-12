import mongoose, { Schema } from 'mongoose';

const SubscriptionSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    ref: 'users',
  },
  event_id: {
    type: String,
    required: true,
    ref: 'events',
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('subscriptions', SubscriptionSchema);
