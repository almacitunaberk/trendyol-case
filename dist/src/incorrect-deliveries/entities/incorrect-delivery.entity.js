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
exports.IncorrectDelivery = void 0;
const package_entity_1 = require("../../package/entities/package.entity");
const sack_entity_1 = require("../../sack/entities/sack.entity");
const typeorm_1 = require("typeorm");
let IncorrectDelivery = class IncorrectDelivery {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], IncorrectDelivery.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], IncorrectDelivery.prototype, "deliveryPoint", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], IncorrectDelivery.prototype, "packageBarcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], IncorrectDelivery.prototype, "sackBarcode", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => package_entity_1.Package, (_package) => _package.incorrectDeliveries),
    (0, typeorm_1.JoinColumn)({ name: 'packageBarcode', referencedColumnName: 'barcode' }),
    __metadata("design:type", package_entity_1.Package)
], IncorrectDelivery.prototype, "package", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sack_entity_1.Sack, (sack) => sack.incorrectDeliveries),
    (0, typeorm_1.JoinColumn)({ name: 'sackBarcode', referencedColumnName: 'barcode' }),
    __metadata("design:type", sack_entity_1.Sack)
], IncorrectDelivery.prototype, "sack", void 0);
IncorrectDelivery = __decorate([
    (0, typeorm_1.Entity)()
], IncorrectDelivery);
exports.IncorrectDelivery = IncorrectDelivery;
//# sourceMappingURL=incorrect-delivery.entity.js.map