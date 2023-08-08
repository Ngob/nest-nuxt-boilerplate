import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Response,
  UnauthorizedException,
  UseInterceptors, ClassSerializerInterceptor, Body
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {Request as ExpressRequest, Response as ExpressResponse} from 'express';
import {User} from "../users/entity/user.entity";
import { serialize, instanceToPlain } from 'class-transformer';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";


type RequestWithUser = Request & { user?: User }; // Custom Request type
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getUsers(@Request() { user }: RequestWithUser) {
    return this.usersService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
