import { ITaskRepository } from '../repositories/ITaskRepository';
import { Task } from '../models/Task';
import { Project } from '../models/Project';

export class TaskService {
  constructor(private taskRepository: ITaskRepository) {}

  async createTask(title: string, description: string, dueDate: Date, project: Project): Promise<Task> {
    const task = new Task('', title, description, dueDate, '', undefined, project);
    try {
      return await this.taskRepository.save(task);
    } catch (error) {
      throw new Error('Error creating task on service');
    }
  }

  async getTasks(filter: any, skip: number, limit: number, sort: any): Promise<Task[]> {
    try {
      return await this.taskRepository.findAll(filter, skip, limit, sort);
    } catch (error) {
      throw new Error('Error getting tasks on service');
    }
  }

  async getTaskById(id: string): Promise<Task | null> {
    try {
      return await this.taskRepository.findById(id);
    } catch (error) {
      throw new Error('Error getting task on service');
    }
  }

  async updateTask(id: string, task : Task): Promise<Task | null> {
    try {
      return await this.taskRepository.update(id, task);
    } catch (error) {
      throw new Error('Error updating task on service');
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      await this.taskRepository.deleteById(id);
    } catch (error) {
      throw new Error('Error deleting task on service');
    }
  }
} 