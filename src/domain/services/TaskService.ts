import { ITaskRepository } from "../repositories/ITaskRepository";
import { Task } from "../models/Task";
import { Project } from "../models/Project";

export class TaskService {
  constructor(private taskRepository: ITaskRepository) {}

  async createTask(title: string, description: string, dueDate: Date, project: Project): Promise<Task> {
    const task = new Task('', title, description, dueDate, '', undefined, project);
    return await this.taskRepository.save(task);
  }
  async getTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async getTaskById(id: string): Promise<Task | null> {
    return this.taskRepository.findById(id);
  }

  async updateProject(id: string, task : Task): Promise<Task | null>{
    return this.taskRepository.update(id, task);
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.deleteById(id);
  }
} 