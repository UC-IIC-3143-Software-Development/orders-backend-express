import { User as PrismaUser } from '@prisma/client';

export enum UserStatus {
  ValidUser = 'valid_user',
  ErrorUser = 'error_user',
}

export interface User {
  firstName: string | null;
  lastName: string | null;
}

export interface ValidUser {
  status: UserStatus.ValidUser;
  data: User[];
}

export interface ErrorUser {
  status: UserStatus.ErrorUser;
  message: string;
}

export type UserResponse = ValidUser | ErrorUser;

export const userMapper = (user: PrismaUser): User => ({
  firstName: user.firstName,
  lastName: user.lastName,
});
