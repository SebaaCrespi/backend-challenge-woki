import { Project } from './Project';

export class User {
  constructor(
    public id: string,
    public name?: string,
    public email?: string,
    public password?: string,
    public projects?: Project[],
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}