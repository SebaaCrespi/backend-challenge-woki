import { IProjectRepository } from '../../../domain/repositories/IProjectRepository';
import { Project } from '../../../domain/models/Project';
import ProjectModel from '../schemas/ProjectModel';
import { ProjectMapper } from '../../mappers/ProjectMapper';

export class ProjectRepository implements IProjectRepository {
  async save(project: Project): Promise<Project> {
    const { title, description, dueDate } = project;
    try {
      const projectDoc = new ProjectModel({
        title, 
        description, 
        dueDate,
      });
      const projectSaved = await projectDoc.save();
      return ProjectMapper.toProject(projectSaved);
    } catch (error) {
      throw new Error('Error saving project');
    }
  }

  async findById(id: string): Promise<Project | null> {
    try {
      const projectDoc = await ProjectModel.findById(id).exec();
      if (!projectDoc) return null;
      return ProjectMapper.toProject(projectDoc);
    } catch (error) {
      throw new Error('Error finding project');
    }
  }

  async findAll(): Promise<Project[]> {
    try {
      const projectDocs = await ProjectModel.find().exec();
      return projectDocs.map(projectDoc => ProjectMapper.toProject(projectDoc));
    } catch (error) {
      throw new Error('Error finding projects');
    }
  }

  async update(id: string, project: Project): Promise<Project | null> {
    try {
      const projectDoc = await ProjectModel.findOneAndUpdate({ _id : id }, project).exec();
      if (!projectDoc) return null;
      return ProjectMapper.toProject(projectDoc);
    } catch (error) {
      throw new Error('Error updating project');
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await ProjectModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error('Error deleting projects');
    }
  }
  
}
