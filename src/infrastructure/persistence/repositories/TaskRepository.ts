import { Task } from '../../../domain/models/Task';
import { ITaskRepository } from '../../../domain/repositories/ITaskRepository';
import TaskModel from '../schemas/TaskModel';
import { TaskMapper } from '../../mappers/TaskMapper';

export class TaskRepository implements ITaskRepository {
  async save(task: Task): Promise<Task> {
    const { title, description, dueDate, project } = task;
    try {
      const taskDoc = new TaskModel({
        title, 
        description, 
        dueDate,
        project,
      });
      const taskSaved = await taskDoc.save();
      return TaskMapper.toTask(taskSaved);
    } catch (error) {
      throw new Error('Error saving project');
    }
  }

  async findById(id: string): Promise<Task | null> {
    try {
      const taskDoc = await TaskModel.findById(id).populate('assignedTo').populate('project').exec();
      if (!taskDoc) return null;
      return TaskMapper.toTask(taskDoc);
    } catch (error) {
      throw new Error('Error saving project');
    }
  }

  async findAll(filter: any, skip: number, limit: number, sort: any): Promise<Task[]> {
    try {
      const taskDocs = await TaskModel.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('assignedTo')
        .populate('project')
        .exec();
      return taskDocs.map(task => TaskMapper.toTask(task));
    } catch (error) {
      throw new Error('Error finding projects');
    }
  } 

  async update(id: string, task: Task): Promise<Task | null> {
    try {
      const taskDoc = await TaskModel.findOneAndUpdate({ _id : id }, task).exec();
      if (!taskDoc) return null;
      return TaskMapper.toTask(taskDoc);
    } catch (error) {
      throw new Error('Error updating project');
    }
    
  }

  async deleteById(id: string): Promise<void> {
    try {
      await TaskModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error('Error deleting project');
    }
  }

}
