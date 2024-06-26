import { Schema, model, Document } from 'mongoose';
import { ProjectDocument } from './ProjectModel';

export interface UserDocument extends Document {
  _id : string;
  name: string;
  email: string;
  password : string;
  projects: ProjectDocument[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique : true },
  password : { type: String, required: true },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project', required: false }],
}, { timestamps: true });

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'assignedTo',
});

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;