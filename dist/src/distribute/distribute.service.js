"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributeService = void 0;
const common_1 = require("@nestjs/common");
const sack_service_1 = require("../sack/sack.service");
const package_service_1 = require("../package/package.service");
const sack_entity_1 = require("../sack/entities/sack.entity");
const incorrect_deliveries_service_1 = require("../incorrect-deliveries/incorrect-deliveries.service");
let DistributeService = class DistributeService {
    constructor(sackService, packageService, incorrectDeliveriesService) {
        this.sackService = sackService;
        this.packageService = packageService;
        this.incorrectDeliveriesService = incorrectDeliveriesService;
    }
    async distribute(content) {
        const response = { vehicle: content.vehicle, route: [] };
        const route = content.route;
        await Promise.all(route.map(async (delivery) => {
            const deliveryPoint = delivery.deliveryPoint;
            let barcodes = delivery.deliveries.map((deliveryBarcode) => deliveryBarcode.barcode);
            const results = await Promise.all(barcodes.map(async (barcode) => {
                let sack = await this.sackService.getSackByBarcode(barcode);
                if (sack) {
                    sack = await this.sackService.loadSack(barcode);
                    if (deliveryPoint !== 1 && sack.unloadDeliveryPoint === deliveryPoint) {
                        sack = await this.sackService.unloadSack(barcode);
                    }
                    if (sack.state !== sack_entity_1.ShipmentState.Unloaded) {
                        await this.incorrectDeliveriesService.create(deliveryPoint, null, sack.barcode);
                    }
                    return { barcode: sack.barcode, state: sack.state };
                }
                let _package = await this.packageService.getPackageByBarcode(barcode);
                if (_package) {
                    _package = await this.packageService.loadPackage(barcode);
                    if (deliveryPoint === 1 &&
                        _package.sackBarcode === null &&
                        _package.unloadDeliveryPoint === deliveryPoint) {
                        _package = await this.packageService.unloadIndividualPackage(barcode);
                    }
                    if (deliveryPoint === 2 &&
                        _package.sackBarcode === null &&
                        _package.unloadDeliveryPoint === deliveryPoint) {
                        _package = await this.packageService.unloadIndividualPackage(barcode);
                    }
                    if (deliveryPoint === 2 &&
                        _package.sackBarcode !== null &&
                        _package.unloadDeliveryPoint === deliveryPoint) {
                        _package = await this.packageService.unloadPackageInSack(barcode);
                    }
                    if (deliveryPoint === 3 &&
                        _package.sackBarcode !== null &&
                        _package.unloadDeliveryPoint === deliveryPoint) {
                        console.log(`Package: ${_package}`);
                        _package = await this.packageService.unloadPackageInSack(barcode);
                    }
                    if (_package.state !== sack_entity_1.ShipmentState.Unloaded) {
                        await this.incorrectDeliveriesService.create(deliveryPoint, _package.barcode, null);
                    }
                    return { barcode: _package.barcode, state: _package.state };
                }
            }));
            response.route.push({ deliveryPoint, deliveries: results });
        }));
        return response;
    }
};
DistributeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sack_service_1.SackService,
        package_service_1.PackageService,
        incorrect_deliveries_service_1.IncorrectDeliveriesService])
], DistributeService);
exports.DistributeService = DistributeService;
//# sourceMappingURL=distribute.service.js.map