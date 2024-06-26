import express, { Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { UserRepository } from '../../../infrastructure/persistence/repositories/UserRepository';
import { UserService } from '../../../domain/services/UserService';
import { validateCreateUser, validateUserId } from '../middleware/UserMiddleware';
import { authenticateJWT } from '../middleware/AuthenticationMiddleware';

const userRouter = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.post('/', authenticateJWT, validateCreateUser, (req : Request, res: Response) => userController.createUser(req, res));
userRouter.get('/', authenticateJWT, (req, res) => userController.getUsers(req, res));
userRouter.get('/:id', authenticateJWT, validateUserId, (req : Request, res: Response) => userController.getUserById(req, res));
userRouter.get('/projects/:id',   authenticateJWT, validateUserId, (req : Request, res: Response) => userController.getUserProjectsByStatus(req, res));
userRouter.get('/tasks/:id',   authenticateJWT, validateUserId, (req : Request, res: Response) => userController.getUserTasksByStatus(req, res));
userRouter.delete('/:id',   authenticateJWT, validateUserId, (req : Request, res: Response) => userController.deleteUser(req, res));
userRouter.put('/:id',  authenticateJWT, validateUserId, (req : Request, res: Response) => userController.updateUser(req, res));
userRouter.post('/login', (req : Request, res: Response) => userController.login(req, res));

export default userRouter;