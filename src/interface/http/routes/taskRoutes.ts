import express from 'express';
import { TaskRepository } from '../../../infrastructure/persistence/repositories/TaskRepository';
import { TaskService } from '../../../domain/services/TaskService';
import { TaskController } from '../controllers/TaskController';
import { ProjectService } from '../../../domain/services/ProjectService';
import { ProjectRepository } from '../../../infrastructure/persistence/repositories/ProjectRepository';
import { UserRepository } from '../../../infrastructure/persistence/repositories/UserRepository';
import { UserService } from '../../../domain/services/UserService';

const taskRouter = express.Router();
const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const projectRepository = new ProjectRepository();
const projectService = new ProjectService(projectRepository);
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const taskController = new TaskController(taskService, projectService, userService);

taskRouter.post('/', (req, res) => taskController.createTask(req, res));
taskRouter.get('/', (req, res) => taskController.getTasks(req, res));
taskRouter.get('/:id', (req, res) => taskController.getTaskById(req, res));
taskRouter.delete('/:id', (req, res) => taskController.deleteTask(req, res));
taskRouter.put('/:id', (req, res) => taskController.updateTask(req, res));

export default taskRouter;