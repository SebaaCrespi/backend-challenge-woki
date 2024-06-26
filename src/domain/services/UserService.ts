import { User } from '../models/User';
import { IUserRepository } from '../repositories/IUserRepository';

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(name: string, email: string, password: string): Promise<User> {
    const user = new User('', name, email, password, []);
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error('Error creating user on service');
    }
  }

  async getUsers(filter: any, skip: number, limit: number, sort: any): Promise<User[]> {
    try {
      return await this.userRepository.findAll(filter, skip, limit, sort);
    } catch (error) {
      throw new Error('Error getting users on service');
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      throw new Error('Error getting project on service');
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      return await this.userRepository.findUserByEmail(email);
    } catch (error) {
      throw new Error('Error getting project on service');
    }
  }
  
  
  async getUserProjectsByStatus(id: string, status : string): Promise<User | null> {
    try { 
      return await this.userRepository.findUserProjectsByStatus(id, status);
    } catch (error) {
      throw new Error('Error getting projects users by status on service');
    }
  }

  async getUserTasksByStatus(id: string, status : string): Promise<User | null> {
    try {
      return await this.userRepository.findtUserTasksByStatus(id, status);
    } catch (error) {
      throw new Error('Error getting projects users by status on service');
    }
  }
  
  async updateUser(id: string, user : User): Promise<User | null> {
    try {
      return await this.userRepository.update(id, user);
    } catch (error) {
      throw new Error('Error updating user on service');
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.userRepository.deleteById(id);
    } catch (error) {
      throw new Error('Error deleting user on service');
    }
  }
} 