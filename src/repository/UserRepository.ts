import { User } from "../domain/UserResponse";

export interface UserRepository {
  findAllUsers(): Promise<User[]>;
}
