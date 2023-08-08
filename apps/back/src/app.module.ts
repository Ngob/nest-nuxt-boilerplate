import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import * as Joi from 'joi';
import {ConfigModule, ConfigService} from "@nestjs/config";
import typeorm from './typeorm/typeorm.config';

@Module({
  imports: [HealthcheckModule, AuthModule, UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.string().required(),
      }),
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.getOrThrow<TypeOrmModuleOptions>('typeorm'))
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
