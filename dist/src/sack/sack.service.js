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
exports.SackService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const package_service_1 = require("../../src/package/package.service");
const typeorm_2 = require("typeorm");
const sack_entity_1 = require("./entities/sack.entity");
let SackService = class SackService {
    constructor(repository, packageService) {
        this.repository = repository;
        this.packageService = packageService;
    }
    create(barcode, unloadDeliveryPoint) {
        let sack = this.repository.create({ barcode, unloadDeliveryPoint });
        return this.repository.save(sack);
    }
    findAll() {
        return this.repository.find({ relations: { deliveryPoint: true, packages: true, incorrectDeliveries: true } });
    }
    async findOne(barcode) {
        let sack = await this.repository.findOne({
            relations: { deliveryPoint: true, packages: true },
            where: { barcode },
        });
        if (!sack) {
            throw new common_1.NotFoundException('Sack not found!');
        }
        return sack;
    }
    async getSackByBarcode(barcode) {
        let sack = await this.repository.findOne({
            relations: { packages: true, deliveryPoint: true, incorrectDeliveries: true },
            where: { barcode },
        });
        if (!sack) {
            return null;
        }
        return sack;
    }
    async update(barcode, attrs) {
        let sack = await this.repository.findOne({ where: { barcode } });
        if (!sack) {
            throw new common_1.NotFoundException('Sack not found!');
        }
        Object.assign(sack, attrs);
        return this.repository.save(sack);
    }
    async loadSack(barcode) {
        let sack = await this.repository.findOne({ where: { barcode } });
        if (!sack) {
            throw new common_1.NotFoundException('Sack not found!');
        }
        sack.state = sack_entity_1.ShipmentState.Loaded;
        await this.repository.save(sack);
        return sack;
    }
    async belongingPackageUnloaded(barcode) {
        const sack = await this.repository.findOne({ relations: { packages: true }, where: { barcode } });
        if (!sack) {
            throw new common_1.NotFoundException('Sack not found!');
        }
        if (sack.packages.every((p) => p.state === sack_entity_1.ShipmentState.Unloaded)) {
            sack.state = sack_entity_1.ShipmentState.Unloaded;
            await this.repository.save(sack);
        }
    }
    async unloadSack(barcode) {
        const sack = await this.repository.findOne({ relations: { packages: true }, where: { barcode } });
        if (!sack) {
            throw new common_1.BadRequestException('Sack is not found!');
        }
        sack.state = sack_entity_1.ShipmentState.Unloaded;
        await this.repository.save(sack);
        const packageBarcodes = sack.packages.map((p) => p.barcode);
        for (let barcode of packageBarcodes) {
            await this.packageService.unloadPackageWithSack(barcode);
        }
        return sack;
    }
    async remove(barcode) {
        let sack = await this.repository.findOne({ where: { barcode } });
        if (!sack) {
            throw new common_1.NotFoundException('Sack not found!');
        }
        return await this.repository.remove(sack);
    }
};
SackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sack_entity_1.Sack)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => package_service_1.PackageService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        package_service_1.PackageService])
], SackService);
exports.SackService = SackService;
//# sourceMappingURL=sack.service.js.map