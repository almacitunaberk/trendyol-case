import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { DeliveryPointModule } from 'src/delivery-point/delivery-point.module';
import { SackModule } from 'src/sack/sack.module';
import { PackageModule } from 'src/package/package.module';
import { MaintenanceHealthIndicator } from './maintenance.health';

@Module({
  imports: [TerminusModule, DeliveryPointModule, SackModule, PackageModule],
  controllers: [HealthController],
  providers: [MaintenanceHealthIndicator],
})
export class HealthModule {}
