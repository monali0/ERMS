
import { Types } from 'mongoose';
import { Assignment } from '../models/asignment.model';
import { UserModel } from '../models/user.model';

export class UserService {
    // Get all users (engineers or managers)
    static async getAllUsers() {
        return await UserModel.find({});
    }

    // Get available capacity of an engineer
    static async getAvailableCapacity(engineerId: string) {
        const engineer = await UserModel.findById(engineerId);
        if (!engineer) throw new Error('Engineer not found');

        const assignments = await Assignment.find({
            engineerId: new Types.ObjectId(engineerId),
            startDate: { $lte: new Date() },
            endDate: { $gte: new Date() },
        });

        const totalAllocated = assignments.reduce((sum, a) => {
            return sum + (a.allocationPercentage ?? 0);
        }, 0);

        if (!engineer || engineer.maxCapacity == null) {
            throw new Error('Engineer not found or maxCapacity missing');
        }

        return engineer.maxCapacity - totalAllocated;
    }

    // Find suitable engineers for a project (by skill)
    static async findEngineersForSkills(requiredSkills: string[]) {
        return await UserModel.find({
            role: 'engineer',
            skills: { $in: requiredSkills },
        });
    }
}
