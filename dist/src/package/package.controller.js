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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageController = void 0;
const common_1 = require("@nestjs/common");
const create_package_dto_1 = require("./dtos/create-package.dto");
const package_service_1 = require("./package.service");
let PackageController = class PackageController {
    constructor(packageService) {
        this.packageService = packageService;
    }
    getAllPackages() {
        return this.packageService.findAll();
    }
    getPackageByBarcode(barcode) {
        return this.packageService.findOne(barcode);
    }
    createPackage(body) {
        var _a;
        return this.packageService.create(body.barcode, body.unloadDeliveryPoint, (_a = body.sackBarcode) !== null && _a !== void 0 ? _a : null, body.desi);
    }
    updatePackage(barcode, body) {
        return this.packageService.update(barcode, body);
    }
    deletePackage(barcode) {
        return this.packageService.remove(barcode);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PackageController.prototype, "getAllPackages", null);
__decorate([
    (0, common_1.Get)('/:barcode'),
    __param(0, (0, common_1.Param)('barcode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PackageController.prototype, "getPackageByBarcode", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_package_dto_1.CreatePackageDto]),
    __metadata("design:returntype", void 0)
], PackageController.prototype, "createPackage", null);
__decorate([
    (0, common_1.Put)('/:barcode'),
    __param(0, (0, common_1.Param)('barcode')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PackageController.prototype, "updatePackage", null);
__decorate([
    (0, common_1.Delete)('/:barcode'),
    __param(0, (0, common_1.Param)('barcode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PackageController.prototype, "deletePackage", null);
PackageController = __decorate([
    (0, common_1.Controller)('package'),
    __metadata("design:paramtypes", [package_service_1.PackageService])
], PackageController);
exports.PackageController = PackageController;
//# sourceMappingURL=package.controller.js.map