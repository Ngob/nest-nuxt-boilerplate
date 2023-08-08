import { Test, TestingModule } from '@nestjs/testing';
import { HealthcheckController } from './healthcheck.controller';

describe('HealthcheckController', () => {
  let controller: HealthcheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthcheckController],
    }).compile();

    controller = module.get<HealthcheckController>(HealthcheckController);
  });

  it('index route should return true', () => {
    expect(controller.status()).toStrictEqual({ success: true });
  });
});
