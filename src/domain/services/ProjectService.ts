import { IProjectRepository } from '../repositories/IProjectRepository';
import { Project } from '../models/Project';

export class ProjectService {
  constructor(private projectRepository: IProjectRepository) {}

  async createProject(title: string, description: string, dueDate: Date): Promise<Project> {
    const project = new Project('', title, description, dueDate, '');
    try {
      return await this.projectRepository.save(project);
    } catch (error) {
      throw new Error('Error saving projects on service');
    }
  }

  async getProjects(): Promise<Project[]> {
    try {
      return await this.projectRepository.findAll();
    } catch (error) {
      throw new Error('Error getting projects on service');
    }
  }

  async getProjectById(id: string): Promise<Project | null> {
    try {
      return await this.projectRepository.findById(id);
    } catch (error) {
      throw new Error('Error getting project on service');
    }
  }

  async updateProject(id: string, project : Project): Promise<Project | null> {
    try {
      return await this.projectRepository.update(id, project);
    } catch (error) {
      throw new Error('Error updating project on service');
    }
  }

  async deleteProject(id: string): Promise<void> {
    try {
      await this.projectRepository.deleteById(id);
    } catch (error) {
      throw new Error('Error deleting project on service');
    }
  }
} 