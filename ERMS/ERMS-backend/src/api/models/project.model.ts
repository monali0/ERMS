import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  requiredSkills: [String],
  teamSize: Number,
  status: { type: String, enum: ['planning', 'active', 'completed'], default: 'planning' },
  managerId: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const Project = model('Project', projectSchema);
