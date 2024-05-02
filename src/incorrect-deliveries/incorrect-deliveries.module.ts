import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryPointModule } from 'src/delivery-point/delivery-point.module';
import { PackageModule } from 'src/package/package.module';
import { SackModule } from 'src/sack/sack.module';
import { IncorrectDelivery } from './entities/incorrect-delivery.entity';
import { IncorrectDeliveriesService } from './incorrect-deliveries.service';

@Module({
  imports: [TypeOrmModule.forFeature([IncorrectDelivery])],
  providers: [IncorrectDeliveriesService],
  exports: [IncorrectDeliveriesService],
})
export class IncorrectDeliveriesModule {}
