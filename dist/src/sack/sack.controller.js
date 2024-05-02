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
exports.SackController = void 0;
const common_1 = require("@nestjs/common");
const create_sack_dto_1 = require("./dtos/create-sack.dto");
const sack_service_1 = require("./sack.service");
let SackController = class SackController {
    constructor(sackService) {
        this.sackService = sackService;
    }
    getAllSacks() {
        return this.sackService.findAll();
    }
    getSackByBarcode(barcode) {
        return this.sackService.findOne(barcode);
    }
    createSack(body) {
        return this.sackService.create(body.barcode, body.unloadDeliveryPoint);
    }
    updateSack(barcode, body) {
        return this.sackService.update(barcode, body);
    }
    deleteSack(barcode) {
        return this.sackService.remove(barcode);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SackController.prototype, "getAllSacks", null);
__decorate([
    (0, common_1.Get)('/:barcode'),
    __param(0, (0, common_1.Param)('barcode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SackController.prototype, "getSackByBarcode", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sack_dto_1.CreateSackDto]),
    __metadata("design:returntype", void 0)
], SackController.prototype, "createSack", null);
__decorate([
    (0, common_1.Put)('/:barcode'),
    __param(0, (0, common_1.Param)('barcode')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SackController.prototype, "updateSack", null);
__decorate([
    (0, common_1.Delete)('/:barcode'),
    __param(0, (0, common_1.Param)('barcode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SackController.prototype, "deleteSack", null);
SackController = __decorate([
    (0, common_1.Controller)('sack'),
    __metadata("design:paramtypes", [sack_service_1.SackService])
], SackController);
exports.SackController = SackController;
//# sourceMappingURL=sack.controller.js.map