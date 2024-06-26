import { Schema, model, Document } from 'mongoose';
import { UserDocument } from './UserModel';
import { ProjectDocument } from './ProjectModel';


export interface TaskDocument extends Document {
  _id : string;
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  assignedTo: UserDocument; 
  project: ProjectDocument;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<TaskDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, required: true, default : 'not started' },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
}, { timestamps: true });

const TaskModel = model<TaskDocument>('Task', taskSchema);

export default TaskModel;