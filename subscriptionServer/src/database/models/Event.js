import mongoose, { Schema } from 'mongoose';

const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    days_to_cancel: {
      type: Number,
      default: 10,
    }
  },
);

export default mongoose.model('events', EventSchema);
