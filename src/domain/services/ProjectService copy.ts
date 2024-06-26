import { IProjectRepository } from '../repositories/IProjectRepository';
import { Project } from '../models/Project';

export class ProjectService {
  constructor(private projectRepository: IProjectRepository) {}

  async createProject(title: string, description: string, dueDate: Date): Promise<Project> {
    const project = new Project('', title, description, dueDate, '');
    return await this.projectRepository.save(project);
  }
  async getProjects(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }

  async getProjectById(id: string): Promise<Project | null> {
    return this.projectRepository.findById(id);
  }

  async updateProject(id: string, project : Project): Promise<Project | null> {
    return this.projectRepository.update(id, project);
  }
  async deleteProject(id: string): Promise<void> {
    await this.projectRepository.deleteById(id);
  }
} 