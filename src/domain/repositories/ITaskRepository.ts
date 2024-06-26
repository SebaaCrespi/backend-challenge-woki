import { Task } from '../models/Task';

export interface ITaskRepository {
  save(task: Task): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  findAll(): Promise<Task[]>;
  update(id: string, task : Task): Promise<Task | null>;
  deleteById(id: string): Promise<void>;
}