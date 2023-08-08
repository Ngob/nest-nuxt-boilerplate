import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Response,
  UnauthorizedException,
  UseInterceptors, ClassSerializerInterceptor
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {JwtAuthGuard} from "./jwt-auth.guard";
import {Request as ExpressRequest, Response as ExpressResponse} from 'express';
import {User} from "../users/entity/user.entity";
import { serialize, instanceToPlain } from 'class-transformer';


type RequestWithUser = Request & { user?: User }; // Custom Request type
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Request() { user }: RequestWithUser, @Response() res: ExpressResponse) {
    if (!user) {
      throw UnauthorizedException;
    }
    const { access_token } = await this.authService.login(user);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 30 * 60 * 60 * 24 * 1000), // 30 jours avant expiration
    }).send(instanceToPlain(user));
  }

  @Get('me')
  @UseInterceptors(ClassSerializerInterceptor)
  getProfile(@Request() { user }: RequestWithUser) {
    return user;
  }
}
