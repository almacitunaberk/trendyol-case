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
exports.DeliveryPoint = void 0;
const package_entity_1 = require("../../package/entities/package.entity");
const sack_entity_1 = require("../../sack/entities/sack.entity");
const typeorm_1 = require("typeorm");
let DeliveryPoint = class DeliveryPoint {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], DeliveryPoint.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeliveryPoint.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sack_entity_1.Sack, (sack) => sack.deliveryPoint),
    __metadata("design:type", Array)
], DeliveryPoint.prototype, "sacks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => package_entity_1.Package, (_package) => _package.deliveryPoint),
    __metadata("design:type", Array)
], DeliveryPoint.prototype, "packages", void 0);
DeliveryPoint = __decorate([
    (0, typeorm_1.Entity)()
], DeliveryPoint);
exports.DeliveryPoint = DeliveryPoint;
//# sourceMappingURL=delivery-point.entity.js.map