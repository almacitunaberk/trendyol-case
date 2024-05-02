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
exports.DeliveryPointService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const delivery_point_entity_1 = require("./entities/delivery-point.entity");
let DeliveryPointService = class DeliveryPointService {
    constructor(repository) {
        this.repository = repository;
    }
    create(name, value) {
        let deliveryPoint = this.repository.create({ name, value });
        return this.repository.save(deliveryPoint);
    }
    findAll() {
        return this.repository.find({ relations: { sacks: true, packages: true } });
    }
    async findOne(value) {
        let deliveryPoint = await this.repository.findOne({ relations: { sacks: true, packages: true }, where: { value } });
        if (!deliveryPoint) {
            throw new common_1.NotFoundException('Delivery Point not found!');
        }
        return deliveryPoint;
    }
    async remove(value) {
        let deliveryPoint = await this.repository.findOne({ where: { value } });
        if (!deliveryPoint) {
            throw new common_1.NotFoundException('Delivery Point not found!');
        }
        return await this.repository.remove(deliveryPoint);
    }
};
DeliveryPointService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(delivery_point_entity_1.DeliveryPoint)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DeliveryPointService);
exports.DeliveryPointService = DeliveryPointService;
//# sourceMappingURL=delivery-point.service.js.map