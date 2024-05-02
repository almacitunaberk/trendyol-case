import { forwardRef, Module } from '@nestjs/common';
import { SackService } from './sack.service';
import { SackController } from './sack.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sack } from './entities/sack.entity';
import { PackageModule } from '../../src/package/package.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sack]), forwardRef(() => PackageModule)],
  providers: [SackService],
  controllers: [SackController],
  exports: [SackService],
})
export class SackModule {}
