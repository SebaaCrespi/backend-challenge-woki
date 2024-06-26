import { Task } from "../../../domain/models/Task";
import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import TaskModel from "../schemas/TaskModel";
import { TaskMapper } from "../../mappers/TaskMapper";

export class TaskRepository implements ITaskRepository {
  async save(task: Task): Promise<Task> {;
    const { title, description, dueDate, project} = task;
    const taskDoc = new TaskModel({
        title, 
        description, 
        dueDate,
        project
    });
    const taskSaved = await taskDoc.save();
    return TaskMapper.toTask(taskSaved);
  }

  async findById(id: string): Promise<Task | null> {
    const taskDoc = await TaskModel.findById(id).populate('assignedTo').populate('project').exec();
    if (!taskDoc) return null;
    return TaskMapper.toTask(taskDoc);
  }

  async findAll(): Promise<Task[]> {
    const taskDocs = await TaskModel.find().exec();
    return taskDocs.map(task => TaskMapper.toTask(task))
  } 

  async update(id: string, task: Task): Promise<Task | null> {
    const taskDoc = await TaskModel.findOneAndUpdate({_id : id}, task).exec();
    if (!taskDoc) return null;
    return TaskMapper.toTask(taskDoc);
    
  }
  async deleteById(id: string): Promise<void> {
    await TaskModel.findByIdAndDelete(id).exec();
  }

}
