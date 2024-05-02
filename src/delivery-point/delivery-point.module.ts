import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryPointController } from './delivery-point.controller';
import { DeliveryPointService } from './delivery-point.service';
import { DeliveryPoint } from './entities/delivery-point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryPoint])],
  controllers: [DeliveryPointController],
  providers: [DeliveryPointService],
  exports: [DeliveryPointService],
})
export class DeliveryPointModule {}
