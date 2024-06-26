import { Project } from "../../domain/models/Project";
import { ProjectDocument } from "../persistence/schemas/ProjectModel";

export class ProjectMapper {
    static toProject(projectDocument: ProjectDocument): Project {
        return new Project(
          projectDocument._id,
          projectDocument.title,
          projectDocument.description,
          projectDocument.dueDate,
          projectDocument.status,
          projectDocument.createdAt,
          projectDocument.updatedAt
        );
      }
      
    static toProjectDocument(project: Project): ProjectDocument {
    return {
        _id: project._id,
        title: project.title,
        description: project.description,
        dueDate: project.dueDate,
        status: project.status,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
    } as ProjectDocument;
    }
}