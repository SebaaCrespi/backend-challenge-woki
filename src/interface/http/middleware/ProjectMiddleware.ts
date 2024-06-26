import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import { ProjectRepository } from '../../../infrastructure/persistence/repositories/ProjectRepository';
import { ProjectService } from '../../../domain/services/ProjectService';

const projectRepository = new ProjectRepository();
const projectService = new ProjectService(projectRepository);

export const validateCreateProject = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('dueDate').isISO8601().toDate().withMessage('Invalid due date format'),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateUpdateProject = [
  param('id').isMongoId().withMessage('Invalid project ID'),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const project = await projectService.getProjectById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Error validating project update', error });
    }
  },
];

export const validateProjectId = [
  param('id').isMongoId().withMessage('Invalid Project ID'),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const project = await projectService.getProjectById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Error validating Project id', error });
    }
  },
];