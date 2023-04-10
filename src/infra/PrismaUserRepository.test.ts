import { PrismaClient } from '@prisma/client';
import { User, userMapper } from '../domain/UserResponse';
import { UserRepository } from '../repository/UserRepository';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAllUsers(): Promise<User[]> {
    const prismaUsers = await this.prisma.user.findMany();
    return prismaUsers.map(userMapper);
  }
}

describe('PrismaUserRepository', () => {
  let prismaMock: PrismaClient;
  let userRepository: PrismaUserRepository;

  beforeEach(() => {
    prismaMock = new PrismaClient();
    userRepository = new PrismaUserRepository(prismaMock);
  });

  afterEach(async () => {
    await prismaMock.$disconnect();
  });

  it('should return a list of users when there are users in the database', async () => {
    const prismaUsers = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const expectedUsers = [
      {
        firstName: 'John',
        lastName: 'Doe',
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
      },
    ];

    jest.spyOn(prismaMock.user, 'findMany').mockResolvedValue(prismaUsers);

    const result = await userRepository.findAllUsers();
    expect(result).toEqual(expectedUsers);
  });

  it('should return an empty array when there are no users in the database', async () => {
    jest.spyOn(prismaMock.user, 'findMany').mockResolvedValue([]);

    const result = await userRepository.findAllUsers();
    expect(result).toEqual([]);
  });
});
