import { Request, Response, NextFunction } from 'express';
import { ProjectService } from '../services/project.service';

export const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await ProjectService.getAllProjects();
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
};

export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await ProjectService.getProjectById(req.params.id);
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await ProjectService.createProject(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};
