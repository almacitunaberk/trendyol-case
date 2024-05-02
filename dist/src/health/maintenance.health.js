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
exports.MaintenanceHealthIndicator = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const delivery_point_service_1 = require("../delivery-point/delivery-point.service");
const package_service_1 = require("../package/package.service");
const sack_service_1 = require("../sack/sack.service");
const deliveryPoints_1 = require("../../predefinedData/deliveryPoints");
const sacks_1 = require("../../predefinedData/sacks");
const packages_1 = require("../../predefinedData/packages");
let MaintenanceHealthIndicator = class MaintenanceHealthIndicator extends terminus_1.HealthIndicator {
    constructor(deliveryPointService, sackService, packageService) {
        super();
        this.deliveryPointService = deliveryPointService;
        this.sackService = sackService;
        this.packageService = packageService;
    }
    async isHealthy(key) {
        const returnedDeliveryPoints = await this.deliveryPointService.findAll();
        const returnedSacks = await this.sackService.findAll();
        const returnedPackages = await this.packageService.findAll();
        let isHealthy = true;
        if (deliveryPoints_1.deliveryPoints.length !== returnedDeliveryPoints.length) {
            throw new terminus_1.HealthCheckError('Delivery Point service failed', this.getStatus(key, false, { returnedDeliveryPoints }));
        }
        if (returnedSacks.length !== sacks_1.sacks.length) {
            throw new terminus_1.HealthCheckError('Sack service failed', this.getStatus(key, false, returnedSacks));
        }
        if (packages_1.packages.length !== returnedPackages.length) {
            throw new terminus_1.HealthCheckError('Package service failed', this.getStatus(key, false, { returnedPackages }));
        }
        isHealthy =
            isHealthy &&
                deliveryPoints_1.deliveryPoints.every((deliveryPoint) => returnedDeliveryPoints.filter((returnedDeliveryPoint) => returnedDeliveryPoint.value === deliveryPoint.value)
                    .length !== 0);
        isHealthy =
            isHealthy &&
                sacks_1.sacks.every((sack) => returnedSacks.filter((returnedSack) => returnedSack.barcode === sack.barcode).length !== 0);
        isHealthy =
            isHealthy &&
                packages_1.packages.every((_package) => returnedPackages.filter((returnedPackage) => returnedPackage.barcode === _package.barcode).length !== 0);
        if (isHealthy) {
            return this.getStatus(key, true);
        }
        else {
            throw new terminus_1.HealthCheckError('Health Check failed', this.getStatus(key, false, { returnedDeliveryPoints, returnedSacks, returnedPackages }));
        }
    }
};
MaintenanceHealthIndicator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [delivery_point_service_1.DeliveryPointService,
        sack_service_1.SackService,
        package_service_1.PackageService])
], MaintenanceHealthIndicator);
exports.MaintenanceHealthIndicator = MaintenanceHealthIndicator;
//# sourceMappingURL=maintenance.health.js.map