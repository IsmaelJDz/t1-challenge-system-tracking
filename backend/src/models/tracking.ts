import mongoose, { Schema, Document } from 'mongoose';

export interface ITracking extends Document {
  component: string;
  variant?: string;
  action: string;
  metadata?: object;
}

const TrackingSchema: Schema = new Schema(
  {
    component: { type: String, required: true },
    variant: { type: String },
    action: { type: String, required: true },
    metadata: { type: Object },
  },
  {
    timestamps: true,
  }
);

export const Tracking = mongoose.model<ITracking>(
  'Tracking',
  TrackingSchema
);
