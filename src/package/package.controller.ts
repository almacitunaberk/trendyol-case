import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePackageDto } from './dtos/create-package.dto';
import { Package } from './entities/package.entity';
import { PackageService } from './package.service';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Get()
  getAllPackages() {
    return this.packageService.findAll();
  }

  @Get('/:barcode')
  getPackageByBarcode(@Param('barcode') barcode: string) {
    return this.packageService.findOne(barcode);
  }

  @Post()
  createPackage(@Body() body: CreatePackageDto) {
    return this.packageService.create(body.barcode, body.unloadDeliveryPoint, body.sackBarcode ?? null, body.desi);
  }

  @Put('/:barcode')
  updatePackage(@Param('barcode') barcode: string, @Body() body: Partial<Package>) {
    return this.packageService.update(barcode, body);
  }

  @Delete('/:barcode')
  deletePackage(@Param('barcode') barcode: string) {
    return this.packageService.remove(barcode);
  }
}
