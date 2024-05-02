import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncorrectDeliveriesModule } from 'src/incorrect-deliveries/incorrect-deliveries.module';
import { PackageModule } from 'src/package/package.module';
import { SackModule } from 'src/sack/sack.module';
import { Package } from '../package/entities/package.entity';
import { Sack } from '../sack/entities/sack.entity';
import { DistributeController } from './distribute.controller';
import { DistributeService } from './distribute.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Package]),
    TypeOrmModule.forFeature([Sack]),
    PackageModule,
    SackModule,
    IncorrectDeliveriesModule,
  ],
  controllers: [DistributeController],
  providers: [DistributeService],
})
export class DistributeModule {}
