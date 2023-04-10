import { UserService } from './UserService';
import { UserRepository } from '../repository/UserRepository';
import { UserResponse, UserStatus } from '../domain/UserResponse';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = {
      findAllUsers: jest.fn(),
    } as jest.Mocked<UserRepository>;

    userService = new UserService(userRepository);
  });

  describe('getAllUsers', () => {
    it('should return a valid user response with data when users are found', async () => {
      const users = [
        { firstName: 'John', lastName: 'Doe' },
        { firstName: 'Jane', lastName: 'Doe' },
      ];
      userRepository.findAllUsers.mockResolvedValue(users);

      const result = await userService.getAllUsers();

      expect(result).toEqual({ status: UserStatus.ValidUser, data: users });
    });

    it('should return an error user response when an error occurs', async () => {
      const errorMessage = 'Error getting users';
      userRepository.findAllUsers.mockRejectedValue(new Error(errorMessage));

      const result = await userService.getAllUsers();

      expect(result).toEqual({
        status: UserStatus.ErrorUser,
        message: errorMessage,
      });
    });
  });
});
