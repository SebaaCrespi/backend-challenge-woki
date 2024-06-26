import { Task } from '../../domain/models/Task';
import { TaskDocument } from '../persistence/schemas/TaskModel';
import { ProjectMapper } from './ProjectMapper';
import { UserMapper } from './UserMapper';

export class TaskMapper {
  static toTask(taskDocument: TaskDocument): Task {
    return new Task(
      taskDocument._id,
      taskDocument.title,
      taskDocument.description,
      taskDocument.dueDate,
      taskDocument.status,
      taskDocument.assignedTo && UserMapper.toUser(taskDocument.assignedTo),
      taskDocument.project && ProjectMapper.toProject(taskDocument.project),
      taskDocument.createdAt,
      taskDocument.updatedAt,
    );
  }
    
  static toTaskDocument(task: Task): TaskDocument {
    return {
      _id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
      assignedTo: task.assignedTo && UserMapper.toUserDocument(task.assignedTo),
      project: task.project && ProjectMapper.toProjectDocument(task.project),
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    } as TaskDocument;
  }
}
