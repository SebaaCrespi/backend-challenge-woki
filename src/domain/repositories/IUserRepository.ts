import { User } from '../models/User';

export interface IUserRepository {
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  findAll(filter: any, skip: number, limit: number, sort: any): Promise<User[]>;
  findUserProjectsByStatus( id: string, status : string): Promise<User | null> 
  findtUserTasksByStatus( id: string, status : string): Promise<User | null> 
  update(id: string, user: User): Promise<User | null>;
  deleteById(id: string): Promise<void>;
}