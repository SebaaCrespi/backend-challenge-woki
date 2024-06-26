import { Project } from '../models/Project';

export interface IProjectRepository {
  save(project: Project): Promise<Project>;
  findById(id: string): Promise<Project | null>;
  findAll(): Promise<Project[]>;
  update(id: string, project: Project): Promise<Project | null>;
  deleteById(id: string): Promise<void>;
}

