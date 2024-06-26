import express from 'express';
import { UserController } from '../controllers/UserController';
import { UserRepository } from '../../../infrastructure/persistence/repositories/UserRepository';
import { UserService } from '../../../domain/services/UserService';
import { ProjectRepository } from '../../../infrastructure/persistence/repositories/ProjectRepository';
import { ProjectService } from '../../../domain/services/ProjectService';

const userRouter = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const projectRepository = new ProjectRepository();
const projectService = new ProjectService(projectRepository);
const userController = new UserController(userService, projectService);

userRouter.post('/', (req, res) => userController.createUser(req, res));
userRouter.get('/', (req, res) => userController.getUsers(req, res));
userRouter.get('/:id', (req, res) => userController.getUserById(req, res));
userRouter.delete('/:id', (req, res) => userController.deleteUser(req, res));
userRouter.put('/:id', (req, res) => userController.updateUser(req, res));

export default userRouter;