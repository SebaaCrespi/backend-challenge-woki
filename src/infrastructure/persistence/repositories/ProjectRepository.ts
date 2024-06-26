import { IProjectRepository } from '../../../domain/repositories/IProjectRepository';
import { Project } from '../../../domain/models/Project';
import ProjectModel from '../schemas/ProjectModel';
import { ProjectMapper } from '../../mappers/ProjectMapper';

export class ProjectRepository implements IProjectRepository {
  async save(project: Project): Promise<Project> {;
    const { title, description, dueDate } = project;
    const projectDoc = new ProjectModel({
        title, 
        description, 
        dueDate
    });
    const projectSaved = await projectDoc.save();
    return ProjectMapper.toProject(projectSaved);
  }

  async findById(id: string): Promise<Project | null> {
    const projectDoc = await ProjectModel.findById(id).exec();
    if (!projectDoc) return null;
    return ProjectMapper.toProject(projectDoc);
  }

  async findAll(): Promise<Project[]> {
    const projectDocs = await ProjectModel.find().exec();
    return projectDocs.map(projectDoc => ProjectMapper.toProject(projectDoc));
  }

  async update(id: string, project: Project): Promise<Project | null>{
    const projectDoc = await ProjectModel.findOneAndUpdate({_id : id}, project).exec();
    if (!projectDoc) return null;
    return ProjectMapper.toProject(projectDoc);
  }

  async deleteById(id: string): Promise<void> {
    await ProjectModel.findByIdAndDelete(id).exec();
  }
  
}
