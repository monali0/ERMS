import { Schema, model } from 'mongoose';

const assignmentSchema = new Schema({
  engineerId: { type: Schema.Types.ObjectId, ref: 'User' },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
  allocationPercentage: Number,
  startDate: Date,
  endDate: Date,
  role: String
}, { timestamps: true });

export const Assignment = model('Assignment', assignmentSchema);
