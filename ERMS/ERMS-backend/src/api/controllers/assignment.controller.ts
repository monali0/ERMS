import { Request, Response, NextFunction } from 'express';
import { AssignmentService } from '../services/assignment.service';

export const getAllAssignments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const assignments = await AssignmentService.getAllAssignments();
    res.json({ success: true, data: assignments });
  } catch (err) {
    next(err);
  }
};

export const createAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const assignment = await AssignmentService.createAssignment(req.body);
    res.status(201).json({ success: true, data: assignment });
  } catch (err) {
    next(err);
  }
};

export const updateAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await AssignmentService.updateAssignment(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await AssignmentService.deleteAssignment(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
