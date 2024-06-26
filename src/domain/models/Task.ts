import { Project } from './Project';
import { User } from './User';

export class Task {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public dueDate: Date,
      public status?: string,
      public assignedTo?: User,
      public project?: Project,
      public createdAt?: Date,
      public updatedAt?: Date,
    ) {}
  }
  