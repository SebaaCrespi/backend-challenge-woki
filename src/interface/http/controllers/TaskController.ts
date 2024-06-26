import { Request, Response } from 'express';
import { TaskService } from '../../../domain/services/TaskService';
import { ProjectService } from '../../../domain/services/ProjectService';
import { UserService } from '../../../domain/services/UserService';

export class TaskController {
  constructor(private taskService: TaskService, private projectService: ProjectService, private userService: UserService) {}

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, dueDate, projectId } = req.body;
      const project = await this.projectService.getProjectById(projectId);
      if (!project) {
        res.status(404).json({ message: 'Project not found' });
        return;
      }

      const task = await this.taskService.createTask(title, description, dueDate, project);
      res.status(201).json(task);    
    } catch (error) {
      res.status(500).json({ message: 'Error creating task', error });
    }
  }

  async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const { completed, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'asc' } = req.query;

      const filter = completed !== undefined ? { status: 'completed' } : {};
      const skip = (Number(page) - 1) * Number(limit);
      const sort: any = {};
      sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

      const tasks = await this.taskService.getTasks(filter, skip, Number(limit), sort);
      
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error getting tasks', error });
    }
  }

  async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const task = await this.taskService.getTaskById(req.params.id);
      if (!task) {
        res.status(404).send('Task not found');
      } else {
        res.status(200).json(task);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error getting task', error });
    }
  } 

  async updateTask(req: Request, res: Response): Promise<void> { 
    try {
      const user = req.body?.assignedTo ? await this.userService.getUserById(req.body.assignedTo) : null;
      const project  = await this.projectService.getProjectById(req.body.project);
      if (!project || !user) {
        res.status(404).json({ message: 'Project or User not found' });
        return;
      }
      const taskUpdated = await this.taskService.updateTask(req.params.id, req.body);
      if (taskUpdated) { 
        taskUpdated.assignedTo = user;
        taskUpdated.project = project;
      }
      res.status(200).json(taskUpdated);
    } catch (error) {
      res.status(500).json({ message: 'Error updating task', error });
    }
  }
  
  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      await this.taskService.deleteTask(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error });
    }
  }
}