import { Module } from '@nestjs/common';
import { DeliveryPointModule } from 'src/delivery-point/delivery-point.module';
import { PackageModule } from 'src/package/package.module';
import { SackModule } from 'src/sack/sack.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [DeliveryPointModule, SackModule, PackageModule],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
