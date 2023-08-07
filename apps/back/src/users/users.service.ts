import { Injectable } from '@nestjs/common';
import {PasswordAuthenticatedUser, User} from "./types/user";

// This should be a real class/interface representing a user entity


@Injectable()
export class UsersService {
  private readonly users: PasswordAuthenticatedUser[] = [
    {
      id: "12",
      username: 'john',
      password: 'changeme',
      email: 'john@tcm.com',
    },
    {
      id: "14",
      username: 'maria',
      password: 'guess',
      email: 'john@tcm.com', // Move more logic into an user Object
    },
  ];

  async findOne(username: string): Promise<PasswordAuthenticatedUser | undefined> {
    return this.users.find(user => user.username === username);
  }
}