import { UserMapper } from '../../mappers/UserMapper';
import { User } from '../../../domain/models/User';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import UserModel from '../schemas/UserModel';
import { hashPassword } from '../../utilts/passwordUtils';


export class UserRepository implements IUserRepository {
  async save(user: User): Promise<User> {
    const { name, email, password } = user;
    try {
      const passwordCrypted = await hashPassword(password || '');
      const UserDoc = new UserModel({
        name, 
        email, 
        password : passwordCrypted,
      });
      const savedUser = await UserDoc.save();
      return UserMapper.toUser(savedUser);   
    } catch (error) {
      throw new Error('Error saving project');
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const userDoc = await UserModel.findById(id).populate('projects').exec();
      if (!userDoc) return null;
      
      return UserMapper.toUser(userDoc);
    } catch (error) {
      throw new Error('Error finding project');
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const userDoc = await UserModel.findOne({ email }).populate('projects').exec();
      if (!userDoc) return null;

      return UserMapper.toUser(userDoc);
    } catch (error) {
      throw new Error('Error finding project');
    }
  }

  async findUserProjectsByStatus( id: string, status : string): Promise<User | null> {
    try {
      const userDoc = await UserModel.findById(id).select('_id projects').populate({
        path: 'projects',
        match: { status },
      }).exec();
      if (!userDoc) return null;
      return UserMapper.toUser(userDoc);
    } catch (error) {
      throw new Error('Error finding projects User by status');
    }
      
  }

  async findtUserTasksByStatus( id: string, status : string): Promise<User | null> {
    try {
      const userDoc = await UserModel.findById(id).select('_id').populate({
        path: 'tasks',
        match: { status },
      }).exec();
      if (!userDoc) return null;
      return UserMapper.toUser(userDoc);
    } catch (error) {
      throw new Error('Error finding projects User by status');
    } 
  }

  

  async findAll(filter: any, skip: number, limit: number, sort: any): Promise<User[]> {
    try {
      const userDocs = await UserModel.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select('-password')
        .populate('projects')
        .exec();
      return userDocs.map(UserMapper.toUser);
    } catch (error) {
      throw new Error('Error finding projects');
    }
  }

  async update(id: string, user: User): Promise<User | null> {
    try {
      const userDoc = await UserModel.findOneAndUpdate({ _id : id }, user).exec();
      if (!userDoc) return null;
      return UserMapper.toUser(userDoc);
    } catch (error) {
      throw new Error('Error updating project');
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await UserModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error('Error updating project');
    }
  }


  
}
