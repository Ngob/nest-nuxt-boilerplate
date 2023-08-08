import {NestFactory, Reflector} from '@nestjs/core';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';
import {ClassSerializerInterceptor, ValidationPipe} from "@nestjs/common";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/');
  app.use(cookieParser()); // cookie parser middleware
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(3000);
}
bootstrap();
