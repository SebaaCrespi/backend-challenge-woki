import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import { TaskRepository } from '../../../infrastructure/persistence/repositories/TaskRepository';
import { ProjectRepository } from '../../../infrastructure/persistence/repositories/ProjectRepository';
import { UserRepository } from '../../../infrastructure/persistence/repositories/UserRepository';
import { TaskService } from '../../../domain/services/TaskService';
import { ProjectService } from '../../../domain/services/ProjectService';
import { UserService } from '../../../domain/services/UserService';

const taskRepository = new TaskRepository();
const projectRepository = new ProjectRepository();
const userRepository = new UserRepository();
const taskService = new TaskService(taskRepository);
const projectService = new ProjectService(projectRepository);
const userService = new UserService(userRepository);

export const validateCreateTask = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('dueDate').isISO8601().toDate().withMessage('Invalid due date format'),
  body('projectId').notEmpty().withMessage('Project ID is required'),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { projectId } = req.body;
      const project = await projectService.getProjectById(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Error validating task creation', error });
    }
  },
];

export const validateUpdateTask = [
  param('id').isMongoId().withMessage('Invalid task ID'),
  body('assignedTo').optional().isMongoId().withMessage('Invalid user ID'),
  body('project').optional().isMongoId().withMessage('Invalid project ID'),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const taskId = req.params.id;
      const task = await taskService.getTaskById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      if (req.body.assignedTo) {
        const user = await userService.getUserById(req.body.assignedTo);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
      }

      if (req.body.project) {
        const project = await projectService.getProjectById(req.body.project);
        if (!project) {
          return res.status(404).json({ message: 'Project not found' });
        }
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: 'Error validating task update', error });
    }
  },
];

export const validateTaskId = [
  param('id').isMongoId().withMessage('Invalid user ID'),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const task = await taskService.getTaskById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Error validating task id', error });
    }
  },
];