import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DeliveryPointService } from './delivery-point.service';
import { CreateDeliveryPointDto } from './dtos/create-delivery-point.dto';

@Controller('delivery-point')
export class DeliveryPointController {
  constructor(private readonly deliveryPointService: DeliveryPointService) {}
  @Get()
  getAllDeliveryPoints() {
    return this.deliveryPointService.findAll();
  }

  @Get('/:value')
  getDeliveryPointByValue(@Param('value') value: number) {
    return this.deliveryPointService.findOne(value);
  }

  @Post()
  createDeliveryPoint(@Body() body: CreateDeliveryPointDto) {
    return this.deliveryPointService.create(body.name, body.value);
  }

  @Delete('/:value')
  deleteDeliveryPoint(@Param('id') value: number) {
    return this.deliveryPointService.remove(value);
  }
}
