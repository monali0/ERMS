import { Request, Response, NextFunction } from 'express';
import { EngineerModel } from '../models/engineer.model';

// Get all engineers
export const getEngineers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const engineers = await EngineerModel.find();
    res.status(200).json({ success: true, data: engineers });
  } catch (error) {
    next(error);
  }
};

// Get capacity of a specific engineer by ID
export const getCapacity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // The authenticated user is available via req.user (from authenticate middleware)
    const user = (req as any).user;
    
    // Get engineer ID from route params
    const { id } = req.params;

    // Verify the authenticated user has access to this engineer's data
    // This assumes engineers are associated with users in your system
    const engineer = await EngineerModel.findOne({ _id: id, user: user.id });

    if (!engineer) {
      res.status(404).json({ 
        success: false, 
        message: 'Engineer not found or not authorized' 
      });
      return;
    }

    // Return the capacity data
    res.status(200).json({ 
      success: true, 
      data: {
        capacity: engineer.capacity,
        // Include other relevant fields if needed
        engineerId: engineer._id,
        engineerName: engineer.name
      }
    });
  } catch (error) {
    next(error);
  }
};