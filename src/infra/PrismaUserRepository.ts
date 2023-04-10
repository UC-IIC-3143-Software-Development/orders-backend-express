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
