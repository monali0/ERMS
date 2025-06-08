import mongoose, { Schema, Document } from 'mongoose';

export interface IEngineer extends Document {
  name: string;
  email: string;
  capacity: number; 
}

const EngineerSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true, default: 0 },
}, {
  timestamps: true,
});

export const EngineerModel = mongoose.model<IEngineer>('Engineer', EngineerSchema);
