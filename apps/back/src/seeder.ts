import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';
import { UsersSeeder } from './users/users.seeder';
import { AppModule } from './app.module';
seeder({
  imports: [AppModule, TypeOrmModule.forFeature([User])],
}).run([UsersSeeder]);
