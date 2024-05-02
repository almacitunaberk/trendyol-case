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
exports.SeederService = void 0;
const common_1 = require("@nestjs/common");
const delivery_point_service_1 = require("../delivery-point/delivery-point.service");
const package_service_1 = require("../package/package.service");
const sack_service_1 = require("../sack/sack.service");
const deliveryPoints_1 = require("../../predefinedData/deliveryPoints");
const sacks_1 = require("../../predefinedData/sacks");
const packages_1 = require("../../predefinedData/packages");
let SeederService = class SeederService {
    constructor(deliveryPointService, sackService, packageService) {
        this.deliveryPointService = deliveryPointService;
        this.sackService = sackService;
        this.packageService = packageService;
    }
    async seed() {
        var _a;
        for (let deliveryPoint of deliveryPoints_1.deliveryPoints) {
            await this.deliveryPointService.create(deliveryPoint.name, deliveryPoint.value);
        }
        for (let sack of sacks_1.sacks) {
            await this.sackService.create(sack.barcode, sack.unloadDeliveryPoint);
        }
        for (let _package of packages_1.packages) {
            await this.packageService.create(_package.barcode, _package.unloadDeliveryPoint, (_a = _package.sackBarcode) !== null && _a !== void 0 ? _a : null, _package.desi);
        }
    }
};
SeederService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [delivery_point_service_1.DeliveryPointService,
        sack_service_1.SackService,
        package_service_1.PackageService])
], SeederService);
exports.SeederService = SeederService;
//# sourceMappingURL=seeder.service.js.map