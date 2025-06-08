import { Assignment } from "../models/asignment.model";
import { User } from "../models/user.model";

export const getAvailableCapacity = async (engineerId: string) => {
  const engineer = await User.findById(engineerId);
  const activeAssignments = await Assignment.find({
    engineerId,
    endDate: { $gte: new Date() }
  });

const totalAllocated = activeAssignments.reduce((sum, a) => sum + (a.allocationPercentage ?? 0), 0);
  return (engineer?.maxCapacity ?? 0) - totalAllocated;
};

export const findSuitableEngineers = async (project: any) => {
  return await User.find({
    role: 'engineer',
    skills: { $in: project.requiredSkills }
  });
};
