import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { User, userMapper } from '../domain/UserResponse';
import { PrismaUserRepository } from '../infra/PrismaUserRepository';

jest.mock('@prisma/client');

const prismaMock = {
  user: {
    findMany: jest.fn(),
  },
} as unknown as PrismaClient;

describe('PrismaUserRepository', () => {
  let userRepository: PrismaUserRepository;

  beforeEach(() => {
    userRepository = new PrismaUserRepository(prismaMock);
  });

  describe('findAllUsers', () => {
    it('should return an empty array when there are no users in the database', async () => {
      jest.spyOn(prismaMock.user, 'findMany').mockResolvedValue([]);
      const result = await userRepository.findAllUsers();
      expect(result).toEqual([]);
    });

    it('should return a list of users when there are users in the database', async () => {
      const prismaUsers: PrismaUser[] = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          createdAt: new Date('2022-04-09T15:30:00.000Z'),
          updatedAt: new Date('2022-04-09T15:45:00.000Z'),
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Doe',
          createdAt: new Date('2022-04-09T15:30:00.000Z'),
          updatedAt: new Date('2022-04-09T15:45:00.000Z'),
        },
      ];

      jest.spyOn(prismaMock.user, 'findMany').mockResolvedValue(prismaUsers);
      const expectedUsers: User[] = prismaUsers.map(userMapper);

      const result = await userRepository.findAllUsers();
      expect(result).toEqual(expectedUsers);
    });

    it('should throw an error when the database query fails', async () => {
      const errorMessage = 'Database error';

      jest
        .spyOn(prismaMock.user, 'findMany')
        .mockRejectedValue(new Error(`Error getting users: ${errorMessage}`));

      await expect(userRepository.findAllUsers()).rejects.toThrowError(
        `Error getting users: ${errorMessage}`,
      );
    });
  });
});
