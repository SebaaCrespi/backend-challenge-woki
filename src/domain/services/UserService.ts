import { User } from "../models/User";
import { IUserRepository } from "../repositories/IUserRepository";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(name: string, email: string, password: string): Promise<User> {
    const user = new User('', name, email, password, []);
    return await this.userRepository.save(user);
  }
  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
} 