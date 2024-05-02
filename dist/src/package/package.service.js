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
exports.PackageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sack_entity_1 = require("../../src/sack/entities/sack.entity");
const sack_service_1 = require("../../src/sack/sack.service");
const typeorm_2 = require("typeorm");
const package_entity_1 = require("./entities/package.entity");
let PackageService = class PackageService {
    constructor(repository, sackService) {
        this.repository = repository;
        this.sackService = sackService;
    }
    async create(barcode, unloadDeliveryPoint, sackBarcode, desi) {
        if (sackBarcode) {
            const sack = await this.sackService.findOne(sackBarcode);
            if (!sack) {
                throw new common_1.BadRequestException('Provided sack barcode does not belong to a sack!');
            }
            if (sack.unloadDeliveryPoint !== unloadDeliveryPoint) {
                throw new common_1.BadRequestException('Packages can only be assigned to sacks with the same delivery point!');
            }
        }
        const _package = this.repository.create({ barcode, unloadDeliveryPoint, sackBarcode, desi });
        return this.repository.save(_package);
    }
    findAll() {
        return this.repository.find({ relations: { deliveryPoint: true, belongedSack: true, incorrectDeliveries: true } });
    }
    async findOne(barcode) {
        let _package = await this.repository.findOne({
            relations: { deliveryPoint: true, belongedSack: true, incorrectDeliveries: true },
            where: { barcode },
        });
        if (!_package) {
            throw new common_1.NotFoundException('Package not found!');
        }
        return _package;
    }
    async getPackageByBarcode(barcode) {
        let _package = await this.repository.findOne({
            relations: { deliveryPoint: true, belongedSack: true },
            where: { barcode },
        });
        return _package;
    }
    async loadPackage(barcode) {
        const _package = await this.repository.findOne({ where: { barcode } });
        if (!_package) {
            throw new common_1.NotFoundException('Package not found!');
        }
        _package.state = sack_entity_1.ShipmentState.Loaded;
        await this.repository.save(_package);
        return _package;
    }
    async unloadPackageInSack(barcode) {
        let _package = await this.repository.findOne({
            relations: { belongedSack: true },
            where: { barcode },
        });
        if (!_package) {
            throw new common_1.NotFoundException('Package not found!');
        }
        _package.state = sack_entity_1.ShipmentState.Unloaded;
        await this.repository.save(_package);
        if (_package.sackBarcode) {
            await this.sackService.belongingPackageUnloaded(_package.sackBarcode);
        }
        return _package;
    }
    async unloadIndividualPackage(barcode) {
        let _package = await this.repository.findOne({ where: { barcode } });
        if (!_package) {
            throw new common_1.NotFoundException('Package not found!');
        }
        _package.state = sack_entity_1.ShipmentState.Unloaded;
        await this.repository.save(_package);
        return _package;
    }
    async unloadPackageWithSack(barcode) {
        let _package = await this.repository.findOne({ where: { barcode } });
        if (!_package) {
            throw new common_1.BadRequestException('Package not found!');
        }
        _package.state = sack_entity_1.ShipmentState.Unloaded;
        await this.repository.save(_package);
    }
    async update(barcode, attrs) {
        let _package = await this.repository.findOne({
            relations: { deliveryPoint: true, belongedSack: true },
            where: { barcode },
        });
        if (!_package) {
            throw new common_1.NotFoundException('Package not found!');
        }
        Object.assign(_package, attrs);
        return await this.repository.save(_package);
    }
    async remove(barcode) {
        let _package = await this.repository.findOne({ where: { barcode } });
        if (!_package) {
            throw new common_1.NotFoundException('Package not found!');
        }
        return this.repository.remove(_package);
    }
};
PackageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(package_entity_1.Package)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => sack_service_1.SackService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        sack_service_1.SackService])
], PackageService);
exports.PackageService = PackageService;
//# sourceMappingURL=package.service.js.map