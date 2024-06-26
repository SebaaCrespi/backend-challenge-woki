import { Schema, model, Document } from 'mongoose';

export interface ProjectDocument extends Document {
    _id : string;
    title: string;
    description: string;
    dueDate: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const projectSchema = new Schema<ProjectDocument>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, default : 'not started'},
}, { timestamps: true });

const ProjectModel = model<ProjectDocument>('Project', projectSchema);

export default ProjectModel;