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
exports.DeliveryPointController = void 0;
const common_1 = require("@nestjs/common");
const delivery_point_service_1 = require("./delivery-point.service");
const create_delivery_point_dto_1 = require("./dtos/create-delivery-point.dto");
let DeliveryPointController = class DeliveryPointController {
    constructor(deliveryPointService) {
        this.deliveryPointService = deliveryPointService;
    }
    getAllDeliveryPoints() {
        return this.deliveryPointService.findAll();
    }
    getDeliveryPointByValue(value) {
        return this.deliveryPointService.findOne(value);
    }
    createDeliveryPoint(body) {
        return this.deliveryPointService.create(body.name, body.value);
    }
    deleteDeliveryPoint(value) {
        return this.deliveryPointService.remove(value);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DeliveryPointController.prototype, "getAllDeliveryPoints", null);
__decorate([
    (0, common_1.Get)('/:value'),
    __param(0, (0, common_1.Param)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DeliveryPointController.prototype, "getDeliveryPointByValue", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_delivery_point_dto_1.CreateDeliveryPointDto]),
    __metadata("design:returntype", void 0)
], DeliveryPointController.prototype, "createDeliveryPoint", null);
__decorate([
    (0, common_1.Delete)('/:value'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DeliveryPointController.prototype, "deleteDeliveryPoint", null);
DeliveryPointController = __decorate([
    (0, common_1.Controller)('delivery-point'),
    __metadata("design:paramtypes", [delivery_point_service_1.DeliveryPointService])
], DeliveryPointController);
exports.DeliveryPointController = DeliveryPointController;
//# sourceMappingURL=delivery-point.controller.js.map