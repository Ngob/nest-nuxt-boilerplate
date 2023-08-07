import {Controller, Get, Request, Post, UseGuards, Response, UnauthorizedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {JwtAuthGuard} from "./jwt-auth.guard";
import {Request as ExpressRequest, Response as ExpressResponse} from 'express';
import {User} from "../users/types/user";


type RequestWithUser = Request & { user?: User }; // Custom Request type
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() { user }: RequestWithUser, @Response() res: ExpressResponse) {
    if (!user) {
      throw UnauthorizedException;
    }
    const { access_token } = await this.authService.login(user);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    }).send({ status: 'ok' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
