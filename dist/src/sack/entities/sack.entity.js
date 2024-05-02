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
exports.Sack = exports.ShipmentState = void 0;
const delivery_point_entity_1 = require("../../delivery-point/entities/delivery-point.entity");
const package_entity_1 = require("../../package/entities/package.entity");
const typeorm_1 = require("typeorm");
const incorrect_delivery_entity_1 = require("../../incorrect-deliveries/entities/incorrect-delivery.entity");
var ShipmentState;
(function (ShipmentState) {
    ShipmentState[ShipmentState["Created"] = 1] = "Created";
    ShipmentState[ShipmentState["LoadedIntoSack"] = 2] = "LoadedIntoSack";
    ShipmentState[ShipmentState["Loaded"] = 3] = "Loaded";
    ShipmentState[ShipmentState["Unloaded"] = 4] = "Unloaded";
})(ShipmentState = exports.ShipmentState || (exports.ShipmentState = {}));
let Sack = class Sack {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Sack.prototype, "barcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: ShipmentState.Created }),
    __metadata("design:type", Number)
], Sack.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sack.prototype, "unloadDeliveryPoint", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => delivery_point_entity_1.DeliveryPoint, (deliveryPoint) => deliveryPoint.sacks),
    (0, typeorm_1.JoinColumn)({ name: 'unloadDeliveryPoint', referencedColumnName: 'value' }),
    __metadata("design:type", delivery_point_entity_1.DeliveryPoint)
], Sack.prototype, "deliveryPoint", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => package_entity_1.Package, (_package) => _package.belongedSack),
    __metadata("design:type", Array)
], Sack.prototype, "packages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => incorrect_delivery_entity_1.IncorrectDelivery, (incorrectDelivery) => incorrectDelivery.sack),
    __metadata("design:type", Array)
], Sack.prototype, "incorrectDeliveries", void 0);
Sack = __decorate([
    (0, typeorm_1.Entity)()
], Sack);
exports.Sack = Sack;
//# sourceMappingURL=sack.entity.js.map