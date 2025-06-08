import { Types } from 'mongoose';
import { Project } from '../models/project.model';

export class ProjectService {
  // Get all projects
  static async getAllProjects() {
    return await Project.find().populate('managerId');
  }

  // Get a project by ID
  static async getProjectById(projectId: string) {
    const project = await Project.findById(projectId).populate('managerId');
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }

  // Create a new project
  static async createProject(data: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    requiredSkills: string[];
    teamSize: number;
    status: 'planning' | 'active' | 'completed';
    managerId: string;
  }) {
    const project = new Project({
      name: data.name,
      description: data.description,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      requiredSkills: data.requiredSkills,
      teamSize: data.teamSize,
      status: data.status,
      managerId: new Types.ObjectId(data.managerId),
    });

    return await project.save();
  }
}
