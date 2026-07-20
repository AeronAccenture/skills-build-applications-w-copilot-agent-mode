import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  userId: string;
  type: string;
  duration: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
