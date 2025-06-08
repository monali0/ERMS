import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserService.getAllUsers();
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

export const getEngineerCapacity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const capacity = await UserService.getAvailableCapacity(req.params.id);
    res.json({ success: true, capacity });
  } catch (err) {
    next(err);
  }
};
