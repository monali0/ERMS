import { Types } from 'mongoose';
import { Assignment } from '../models/asignment.model';

export class AssignmentService {
  // Fetch all assignments
  static async getAllAssignments() {
    return await Assignment.find().populate('engineerId projectId');
  }

  // Create a new assignment
  static async createAssignment(data: {
    engineerId: string;
    projectId: string;
    allocationPercentage: number;
    startDate: string;
    endDate: string;
    role: string;
  }) {
    const assignment = new Assignment({
      engineerId: new Types.ObjectId(data.engineerId),
      projectId: new Types.ObjectId(data.projectId),
      allocationPercentage: data.allocationPercentage,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      role: data.role,
    });

    return await assignment.save();
  }

  // Update an existing assignment
  static async updateAssignment(id: string, data: Partial<{
    engineerId: string;
    projectId: string;
    allocationPercentage: number;
    startDate: string;
    endDate: string;
    role: string;
  }>) {
    const updatePayload: any = { ...data };

    if (data.engineerId) updatePayload.engineerId = new Types.ObjectId(data.engineerId);
    if (data.projectId) updatePayload.projectId = new Types.ObjectId(data.projectId);
    if (data.startDate) updatePayload.startDate = new Date(data.startDate);
    if (data.endDate) updatePayload.endDate = new Date(data.endDate);

    return await Assignment.findByIdAndUpdate(id, updatePayload, { new: true });
  }

  // Delete an assignment
  static async deleteAssignment(id: string) {
    return await Assignment.findByIdAndDelete(id);
  }
}
