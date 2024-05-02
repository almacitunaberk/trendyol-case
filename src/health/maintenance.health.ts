import { Injectable } from '@nestjs/common';
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { DeliveryPointService } from 'src/delivery-point/delivery-point.service';
import { PackageService } from 'src/package/package.service';
import { SackService } from 'src/sack/sack.service';
import { deliveryPoints } from 'predefinedData/deliveryPoints';
import { sacks } from 'predefinedData/sacks';
import { packages } from 'predefinedData/packages';

@Injectable()
export class MaintenanceHealthIndicator extends HealthIndicator {
  constructor(
    private readonly deliveryPointService: DeliveryPointService,
    private readonly sackService: SackService,
    private readonly packageService: PackageService
  ) {
    super();
  }

  async isHealthy(key: string) {
    const returnedDeliveryPoints = await this.deliveryPointService.findAll();
    const returnedSacks = await this.sackService.findAll();
    const returnedPackages = await this.packageService.findAll();
    let isHealthy = true;
    if (deliveryPoints.length !== returnedDeliveryPoints.length) {
      throw new HealthCheckError(
        'Delivery Point service failed',
        this.getStatus(key, false, { returnedDeliveryPoints })
      );
    }
    if (returnedSacks.length !== sacks.length) {
      throw new HealthCheckError('Sack service failed', this.getStatus(key, false, returnedSacks));
    }
    if (packages.length !== returnedPackages.length) {
      throw new HealthCheckError('Package service failed', this.getStatus(key, false, { returnedPackages }));
    }
    isHealthy =
      isHealthy &&
      deliveryPoints.every(
        (deliveryPoint) =>
          returnedDeliveryPoints.filter((returnedDeliveryPoint) => returnedDeliveryPoint.value === deliveryPoint.value)
            .length !== 0
      );
    isHealthy =
      isHealthy &&
      sacks.every((sack) => returnedSacks.filter((returnedSack) => returnedSack.barcode === sack.barcode).length !== 0);
    isHealthy =
      isHealthy &&
      packages.every(
        (_package) =>
          returnedPackages.filter((returnedPackage) => returnedPackage.barcode === _package.barcode).length !== 0
      );
    if (isHealthy) {
      return this.getStatus(key, true);
    } else {
      throw new HealthCheckError(
        'Health Check failed',
        this.getStatus(key, false, { returnedDeliveryPoints, returnedSacks, returnedPackages })
      );
    }
  }
}
