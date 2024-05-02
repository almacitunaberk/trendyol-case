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
exports.Package = void 0;
const delivery_point_entity_1 = require("../../delivery-point/entities/delivery-point.entity");
const sack_entity_1 = require("../../sack/entities/sack.entity");
const typeorm_1 = require("typeorm");
const incorrect_delivery_entity_1 = require("../../incorrect-deliveries/entities/incorrect-delivery.entity");
let Package = class Package {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Package.prototype, "barcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: sack_entity_1.ShipmentState.Created }),
    __metadata("design:type", Number)
], Package.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Package.prototype, "unloadDeliveryPoint", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Package.prototype, "sackBarcode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Package.prototype, "desi", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => delivery_point_entity_1.DeliveryPoint, (deliveryPoint) => deliveryPoint.packages),
    (0, typeorm_1.JoinColumn)({ name: 'unloadDeliveryPoint', referencedColumnName: 'value' }),
    __metadata("design:type", delivery_point_entity_1.DeliveryPoint)
], Package.prototype, "deliveryPoint", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sack_entity_1.Sack, (sack) => sack.packages),
    (0, typeorm_1.JoinColumn)({ name: 'sackBarcode', referencedColumnName: 'barcode' }),
    __metadata("design:type", sack_entity_1.Sack)
], Package.prototype, "belongedSack", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => incorrect_delivery_entity_1.IncorrectDelivery, (incorrectDelivery) => incorrectDelivery.package),
    __metadata("design:type", Array)
], Package.prototype, "incorrectDeliveries", void 0);
Package = __decorate([
    (0, typeorm_1.Entity)()
], Package);
exports.Package = Package;
//# sourceMappingURL=package.entity.js.map