import { Router } from 'express';
import * as EngineerController from '../controllers/engineer.controller';
import * as ProjectController from '../controllers/project.controller';
import * as AssignmentController from '../controllers/assignment.controller';
import { login, getProfile, refreshToken } from '../controllers/auth.controller'; // direct import of functions
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
// health check route

router.get('/health', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});
// Auth
router.post('/auth/login', login);
router.get('/auth/profile', authenticate, getProfile);  
router.post('/auth/refresh-token', refreshToken);
router.get('/auth/me',authenticate,getProfile); 

// Engineers
router.get('/engineers', authenticate, EngineerController.getEngineers);
router.get('/engineers/:id/capacity', authenticate, EngineerController.getCapacity);

// Projects
router.get('/projects', authenticate, ProjectController.getAllProjects);
router.post('/projects', authenticate, ProjectController.createProject);
router.get('/projects/:id', authenticate, ProjectController.getProjectById);

// Assignments
router.get('/assignments', authenticate, AssignmentController.getAllAssignments);
router.post('/assignments', authenticate, AssignmentController.createAssignment);
router.put('/assignments/:id', authenticate, AssignmentController.updateAssignment);
router.delete('/assignments/:id', authenticate, AssignmentController.deleteAssignment);

export default router;
