import mongoose, { Schema, Document } from 'mongoose';

export interface ITracking extends Document {
  component: string; // Ej: "Button", "Card"
  variant?: string; // Ej: "primary", "outline"
  action: string; // Ej: "click", "hover", "mount"
  metadata?: object; // Datos extra flexibles
}

const TrackingSchema: Schema = new Schema(
  {
    component: { type: String, required: true },
    variant: { type: String },
    action: { type: String, required: true },
    metadata: { type: Object },
  },
  {
    timestamps: true, // Esto crea automáticamente createdAt y updatedAt
  }
);

export const Tracking = mongoose.model<ITracking>(
  'Tracking',
  TrackingSchema
);
