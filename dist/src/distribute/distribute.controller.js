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
exports.DistributeController = void 0;
const common_1 = require("@nestjs/common");
const distribute_service_1 = require("./distribute.service");
const distribute_request_dto_1 = require("./dtos/distribute-request.dto");
let DistributeController = class DistributeController {
    constructor(distributeService) {
        this.distributeService = distributeService;
    }
    distributeDeliveries(vehicle, body) {
        return this.distributeService.distribute(body);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('vehicle')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, distribute_request_dto_1.DistributeRequestDto]),
    __metadata("design:returntype", void 0)
], DistributeController.prototype, "distributeDeliveries", null);
DistributeController = __decorate([
    (0, common_1.Controller)('vehicles/:vehicle/distribute'),
    __metadata("design:paramtypes", [distribute_service_1.DistributeService])
], DistributeController);
exports.DistributeController = DistributeController;
//# sourceMappingURL=distribute.controller.js.map