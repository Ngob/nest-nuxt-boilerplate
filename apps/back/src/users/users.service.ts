import { Injectable } from '@nestjs/common';
//import {PasswordAuthenticatedUser, User} from "./type/user";
import {InjectRepository} from "@nestjs/typeorm";
import { User } from './entity/user.entity'
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";

// This should be a real class/interface representing a user entity


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({username});
  }

  async findOneById(id: string) {
    return this.usersRepository.findOneBy({id});
  }

  async findAll(limit: number = 1000, offset: number = 0) {
    return this.usersRepository.find({
      skip: offset,
      take: limit
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create({
      username: createUserDto.email,
      email: createUserDto.email,
      password: createUserDto.password,
    });
    // Insert into the database.
    await this.usersRepository.insert(user);
    return user;
  }
}