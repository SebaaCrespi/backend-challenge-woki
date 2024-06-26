import { Request, Response } from 'express';
import { UserService } from '../../../domain/services/UserService';

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;
    const user = await this.userService.createUser(name, email, password);
    res.status(201).json(user);
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    const users = await this.userService.getUsers();
    res.status(200).json(users);
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const users = await this.userService.getUserById(req.params.id);
    if (!users) {
      res.status(404).send('User not found');
    } else {
      res.status(200).json(users);
    }
  } 

  async deleteUser(req: Request, res: Response): Promise<void> {
    await this.userService.deleteUser(req.params.id);
    res.status(204).send();
  }
}