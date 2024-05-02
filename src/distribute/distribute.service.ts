import { Injectable } from '@nestjs/common';
import { DistributeRequestDto } from './dtos/distribute-request.dto';
import { SackService } from 'src/sack/sack.service';
import { PackageService } from 'src/package/package.service';
import { ShipmentState } from 'src/sack/entities/sack.entity';
import { IncorrectDeliveriesService } from 'src/incorrect-deliveries/incorrect-deliveries.service';

@Injectable()
export class DistributeService {
  constructor(
    private readonly sackService: SackService,
    private readonly packageService: PackageService,
    private readonly incorrectDeliveriesService: IncorrectDeliveriesService
  ) {}
  async distribute(content: DistributeRequestDto) {
    const response = { vehicle: content.vehicle, route: [] };
    const route = content.route;
    await Promise.all<any>(
      route.map(async (delivery) => {
        const deliveryPoint = delivery.deliveryPoint;
        let barcodes = delivery.deliveries.map((deliveryBarcode) => deliveryBarcode.barcode);
        const results = await Promise.all<any>(
          barcodes.map(async (barcode) => {
            let sack = await this.sackService.getSackByBarcode(barcode);
            if (sack) {
              sack = await this.sackService.loadSack(barcode);
              if (deliveryPoint !== 1 && sack.unloadDeliveryPoint === deliveryPoint) {
                sack = await this.sackService.unloadSack(barcode);
              }
              if (sack.state !== ShipmentState.Unloaded) {
                await this.incorrectDeliveriesService.create(deliveryPoint, null, sack.barcode);
              }
              return { barcode: sack.barcode, state: sack.state };
            }
            let _package = await this.packageService.getPackageByBarcode(barcode);
            if (_package) {
              _package = await this.packageService.loadPackage(barcode);
              if (
                deliveryPoint === 1 &&
                _package.sackBarcode === null &&
                _package.unloadDeliveryPoint === deliveryPoint
              ) {
                _package = await this.packageService.unloadIndividualPackage(barcode);
              }
              if (
                deliveryPoint === 2 &&
                _package.sackBarcode === null &&
                _package.unloadDeliveryPoint === deliveryPoint
              ) {
                _package = await this.packageService.unloadIndividualPackage(barcode);
              }
              if (
                deliveryPoint === 2 &&
                _package.sackBarcode !== null &&
                _package.unloadDeliveryPoint === deliveryPoint
              ) {
                _package = await this.packageService.unloadPackageInSack(barcode);
              }
              if (
                deliveryPoint === 3 &&
                _package.sackBarcode !== null &&
                _package.unloadDeliveryPoint === deliveryPoint
              ) {
                console.log(`Package: ${_package}`);
                _package = await this.packageService.unloadPackageInSack(barcode);
              }
              if (_package.state !== ShipmentState.Unloaded) {
                await this.incorrectDeliveriesService.create(deliveryPoint, _package.barcode, null);
              }
              return { barcode: _package.barcode, state: _package.state };
            }
          })
        );
        response.route.push({ deliveryPoint, deliveries: results });
      })
    );
    return response;
  }
}
