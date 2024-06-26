import express from 'express';
import { UserController } from '../controllers/UserController';
import { UserRepository } from '../../../infrastructure/persistence/repositories/UserRepository';
import { UserService } from '../../../domain/services/UserService';

const userRouter = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.post('/', (req, res) => userController.createUser(req, res));
userRouter.get('/', (req, res) => userController.getUsers(req, res));
userRouter.get('/:id', (req, res) => userController.getUserById(req, res));
userRouter.delete('/:id', (req, res) => userController.deleteUser(req, res));
//falta put

export default userRouter;