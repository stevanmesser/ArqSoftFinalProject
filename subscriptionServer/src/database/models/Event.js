import mongoose, { Schema } from 'mongoose';

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  days_to_cancel: {
    type: Number,
    default: 2,
  },
});

export default mongoose.model('events', EventSchema);
