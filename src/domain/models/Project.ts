export class Project {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public dueDate: Date,
    public status: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}