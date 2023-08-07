import {Controller, Get} from '@nestjs/common';

interface HealthCheckStatus {
  success: true
}
@Controller('healthcheck')
export class HealthcheckController {
  @Get()
  status(): HealthCheckStatus {
    return {
      success: true
    };
  }
}
