import { seeder } from "nestjs-seeder";
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {User} from "./users/entity/user.entity";
import {UsersSeeder} from "./users/users.seeder";
import {ConfigModule, ConfigService} from "@nestjs/config";
import * as Joi from "joi";
import typeorm from "./typeorm/typeorm.config";
import {AppModule} from "./app.module";

seeder({
  imports: [
    AppModule,
    TypeOrmModule.forFeature([User])
  ],
}).run([UsersSeeder]);