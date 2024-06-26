import { User } from '../../domain/models/User';
import { UserDocument } from '../persistence/schemas/UserModel';
import { ProjectMapper } from './ProjectMapper';

export class UserMapper {
  
  static toUser(userDocument: UserDocument): User {
    return new User(
      userDocument?._id,
      userDocument?.name,
      userDocument?.email,
      userDocument?.password,
      userDocument?.projects?.length > 0 ? userDocument.projects.map(project => ProjectMapper.toProject(project)) : [],
      userDocument?.createdAt,
      userDocument?.updatedAt,
    );
  }
      
  static toUserDocument(user: User): UserDocument {
    return {
      _id: user?.id,
      name: user?.name,
      email: user?.email,
      password: user?.password,
      projects: user?.projects && user.projects.length > 0 ? user.projects.map(project => ProjectMapper.toProjectDocument(project)) : [],
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    } as UserDocument;
  }
}
