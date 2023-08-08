import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from '../users/entity/user.entity';
import { UsersService } from '../users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
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
    }).compile();

    service = module.get<AuthService>(AuthService);

    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be a valid JWT token', async () => {
    const { access_token } = await service.login(userData);
    expect(jwtService.verify(access_token)).toBeTruthy();
  });
});
