import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UsersController } from './users.controller';

describe('UsersService', () => {
  let service: UsersService;
  const userData: User = new User();
  userData.email = 'john';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: jest.fn(() => {
            return {
              find: () => [userData],
            };
          }),
        },
      ],
      exports: [UsersService],
      controllers: [UsersController],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be retrieve users', async () => {
    expect(await service.findAll()).toContain(userData);
  });
});
