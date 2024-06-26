import { UserMapper } from "../../mappers/UserMapper";
import { User } from "../../../domain/models/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import UserModel from "../schemas/UserModel";
import { hashPassword } from "../../utilts/passwordUtils";


export class UserRepository implements IUserRepository {
  async save(user: User): Promise<User> {
      const { name, email, password } = user;
      const passwordCrypted = await hashPassword(password);
      const UserDoc = new UserModel({
          name, 
          email, 
          password : passwordCrypted
      });
      const savedUser = await UserDoc.save();
      return UserMapper.toUser(savedUser);   
  }

  async findById(id: string): Promise<User | null> {
    const userDoc = await UserModel.findById(id).exec();
    if (!userDoc) return null;
    
    return UserMapper.toUser(userDoc);
  }

  async findAll(): Promise<User[]> {
    const userDocs = await UserModel.find().exec();
    return userDocs.map(UserMapper.toUser);
  }

  async deleteById(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id).exec();
  }


  
}
