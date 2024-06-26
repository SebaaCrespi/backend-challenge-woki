import { Request, Response } from 'express';
import { UserService } from '../../../domain/services/UserService';
import { verifyPassword } from '../../../infrastructure/utilts/passwordUtils';
import { generateJWT } from '../../../infrastructure/utilts/generateToken';

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const user = await this.userService.createUser(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const { email, page = 1, limit = 10, sortBy = '_id', sortOrder = 'asc' } = req.query;

      const pageNumber = parseInt(page as string, 10);
      const limitNumber = parseInt(limit as string, 10);

      const filter: any = {};
      if (email) {
        filter.email = { $regex: new RegExp(email as string, 'i') }; // Filtrar por dirección de correo electrónico
      }
      const sort: any = {};
      sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

      const users = await this.userService.getUsers(filter, pageNumber, limitNumber, sort);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error getting users', error });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getUserById(req.params.id);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error getting user', error });
    }
  }

  async getUserProjectsByStatus(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.getUserProjectsByStatus(req.params.id, req.body.status);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error getting projects User by status', error });
    }
  }

  async getUserTasksByStatus(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.getUserTasksByStatus(req.params.id, req.body.status);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error getting projects User by status', error });
    }
  }

  async updateUser(req: Request, res:Response): Promise<void> {
    try {      
      const userUpdated = await this.userService.updateUser(req.params.id, req.body);

      res.status(200).json(userUpdated);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await this.userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }  
  }

   async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const passwordMatch = await verifyPassword(password, user.password || '');

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const token = generateJWT(user.id);

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error en el inicio de sesión', error });
    }
  }
}