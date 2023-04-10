import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UserService } from '../service/UserService';
import { PrismaUserRepository } from '../infra/PrismaUserRepository';

const prisma = new PrismaClient();
const userRepository = new PrismaUserRepository(prisma);
const userService = new UserService(userRepository);

export const getAllUsersController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting users');
  }
};
