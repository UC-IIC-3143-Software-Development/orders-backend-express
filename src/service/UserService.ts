import { UserRepository } from '../repository/UserRepository';
import { UserResponse, UserStatus } from '../domain/UserResponse';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(): Promise<UserResponse> {
    try {
      const users = await this.userRepository.findAllUsers();
      return { status: UserStatus.ValidUser, data: users };
    } catch (error) {
      return { status: UserStatus.ErrorUser, message: `Error getting users` };
    }
  }
}
