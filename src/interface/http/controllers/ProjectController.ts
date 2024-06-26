import { Request, Response } from 'express';
import { ProjectService } from '../../../domain/services/ProjectService';

export class ProjectController {
  constructor(private projectService: ProjectService) {}

  async createProject(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, dueDate } = req.body;
      const project = await this.projectService.createProject(title, description, dueDate);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: 'Error creating project', error });
    }
  }

  async getProjects(req: Request, res: Response): Promise<void> {
    try {
      const projects = await this.projectService.getProjects();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: 'Error getting projects', error });
    }
  }

  async getProjectById(req: Request, res: Response): Promise<void> {
    try {
      const project = await this.projectService.getProjectById(req.params.id);
      if (!project) {
        res.status(404).send('Project not found');
      } else {
        res.status(200).json(project);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error getting project', error });
    }
  }

  async updateProject(req: Request, res: Response): Promise<void> {
    try {
      const project = await this.projectService.updateProject(req.params.id, req.body);
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: 'Error deleting project', error });
    }
  }

  async deleteProject(req: Request, res: Response): Promise<void> {
    try {
      await this.projectService.deleteProject(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting project', error });
    }
  }
}