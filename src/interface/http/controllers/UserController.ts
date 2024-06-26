import { Request, Response } from 'express';
import { UserService } from '../../../domain/services/UserService';
import { ProjectService } from '../../../domain/services/ProjectService';
import { Project } from '../../../domain/models/Project';

export class UserController {
  constructor(private userService: UserService, private projectService : ProjectService) {}

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

  async updateUser(req: Request, res:Response): Promise<void>{
    try {
      const user = await this.userService.getUserById(req.params.id);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      /* let projectFound : Object | null = null;
       await req.body?.projects.forEach( async (project : Project) => {
        console.log('entré');
        let p = await this.projectService.getProjectById(project._id);
        if(!p){
          projectFound = { id: project._id, exist: false };
        }
      })      
      if (!projectFound && projectFound?.exist) {
        res.status(404).json({ message: 'Project with id: '+project.id+' not founded' });
        return;
      } */

      const userUpdated = await this.userService.updateUser(req.params.id, req.body);

      res.status(200).json(userUpdated);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    await this.userService.deleteUser(req.params.id);
    res.status(204).send();
  }
}