import express, { Request, Response } from 'express';
import { TaskRepository } from '../../../infrastructure/persistence/repositories/TaskRepository';
import { TaskService } from '../../../domain/services/TaskService';
import { TaskController } from '../controllers/TaskController';
import { ProjectService } from '../../../domain/services/ProjectService';
import { ProjectRepository } from '../../../infrastructure/persistence/repositories/ProjectRepository';
import { UserRepository } from '../../../infrastructure/persistence/repositories/UserRepository';
import { UserService } from '../../../domain/services/UserService';
import { validateCreateTask, validateTaskId, validateUpdateTask } from '../middleware/TaskMiddleware';
import { authenticateJWT } from '../middleware/AuthenticationMiddleware';

const taskRouter = express.Router();
const taskRepository = new TaskRepository();
const projectRepository = new ProjectRepository();
const userRepository = new UserRepository();
const taskService = new TaskService(taskRepository);
const projectService = new ProjectService(projectRepository);
const userService = new UserService(userRepository);
const taskController = new TaskController(taskService, projectService, userService);

taskRouter.post('/', authenticateJWT, validateCreateTask, (req: Request, res: Response) => taskController.createTask(req, res));
taskRouter.get('/', authenticateJWT, (req: Request, res: Response) => taskController.getTasks(req, res));
taskRouter.get('/:id', authenticateJWT, validateTaskId, (req: Request, res: Response) => taskController.getTaskById(req, res));
taskRouter.delete('/:id', authenticateJWT, validateTaskId, (req: Request, res: Response) => taskController.deleteTask(req, res));
taskRouter.put('/:id', authenticateJWT, validateUpdateTask, (req: Request, res: Response) => taskController.updateTask(req, res));

export default taskRouter;