import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {User} from "../users/type/user";
import {User as UserEntity} from "../users/entity/user.entity";
import {JwtPayload} from "./types/JwtPayload";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && await user.checkPassword(pass)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  getUserByJwtPayload(payload: JwtPayload): Promise<UserEntity| null> {
      return this.usersService.findOneById(payload.sub);
  }
}