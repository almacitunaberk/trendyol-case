import { Inject, Injectable } from '@nestjs/common';
import { DeliveryPointService } from 'src/delivery-point/delivery-point.service';
import { PackageService } from 'src/package/package.service';
import { SackService } from 'src/sack/sack.service';
import { deliveryPoints } from 'predefinedData/deliveryPoints';
import { sacks } from 'predefinedData/sacks';
import { packages } from 'predefinedData/packages';

@Injectable()
export class SeederService {
  constructor(
    private readonly deliveryPointService: DeliveryPointService,
    private readonly sackService: SackService,
    private readonly packageService: PackageService
  ) {}

  async seed() {
    for (let deliveryPoint of deliveryPoints) {
      await this.deliveryPointService.create(deliveryPoint.name, deliveryPoint.value);
    }
    for (let sack of sacks) {
      await this.sackService.create(sack.barcode, sack.unloadDeliveryPoint);
    }
    for (let _package of packages) {
      await this.packageService.create(
        _package.barcode,
        _package.unloadDeliveryPoint,
        _package.sackBarcode ?? null,
        _package.desi
      );
    }
  }
}
