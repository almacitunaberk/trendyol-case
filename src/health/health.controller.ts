import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { MaintenanceHealthIndicator } from './maintenance.health';

@Controller('health')
export class HealthController {
  constructor(private readonly health: HealthCheckService, private maintenance: MaintenanceHealthIndicator) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.maintenance.isHealthy('Custom Services')]);
  }
}
