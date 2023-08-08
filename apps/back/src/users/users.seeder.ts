import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async seed(): Promise<any> {
    const user = this.usersRepository.create({
      username: 'john',
      email: 'john@tcm.com',
      password: 'apwn',
    });
    // Insert into the database.
    return this.usersRepository.insert(user);
  }

  async drop(): Promise<any> {
    return this.usersRepository.delete({ username: 'john' });
  }
}
