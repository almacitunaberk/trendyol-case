import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DistributeService } from './distribute.service';
import { DistributeRequestDto } from './dtos/distribute-request.dto';

@Controller('vehicles/:vehicle/distribute')
export class DistributeController {
  constructor(private readonly distributeService: DistributeService) {}
  @Post()
  distributeDeliveries(@Param('vehicle') vehicle: string, @Body() body: DistributeRequestDto) {
    return this.distributeService.distribute(body);
  }
}
