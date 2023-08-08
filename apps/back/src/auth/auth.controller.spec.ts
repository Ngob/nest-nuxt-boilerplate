import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entity/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  const userData: User = new User();

  userData.username = 'john';
  userData.id = '123';
  userData.email = '123';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          useFactory: () => {
            return {
              secret: 'JWT_SECRET',
              signOptions: { expiresIn: '1h' },
            };
          },
        }),
      ],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useClass: jest.fn(() => {
            return {
              findOneByUsername: () => userData,
            };
          }),
        },
      ],
      controllers: [AuthController],
    }).compile();
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
