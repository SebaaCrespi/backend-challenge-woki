import { User } from '../models/User';

export interface IUserRepository {
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  deleteById(id: string): Promise<void>;
}