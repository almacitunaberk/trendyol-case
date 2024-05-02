import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateSackDto } from './dtos/create-sack.dto';
import { Sack } from './entities/sack.entity';
import { SackService } from './sack.service';

@Controller('sack')
export class SackController {
  constructor(private readonly sackService: SackService) {}
  @Get()
  getAllSacks() {
    return this.sackService.findAll();
  }
  @Get('/:barcode')
  getSackByBarcode(@Param('barcode') barcode: string) {
    return this.sackService.findOne(barcode);
  }
  @Post()
  createSack(@Body() body: CreateSackDto) {
    return this.sackService.create(body.barcode, body.unloadDeliveryPoint);
  }
  @Put('/:barcode')
  updateSack(@Param('barcode') barcode: string, @Body() body: Partial<Sack>) {
    return this.sackService.update(barcode, body);
  }
  @Delete('/:barcode')
  deleteSack(@Param('barcode') barcode: string) {
    return this.sackService.remove(barcode);
  }
}
