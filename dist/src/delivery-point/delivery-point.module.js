"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryPointModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const delivery_point_controller_1 = require("./delivery-point.controller");
const delivery_point_service_1 = require("./delivery-point.service");
const delivery_point_entity_1 = require("./entities/delivery-point.entity");
let DeliveryPointModule = class DeliveryPointModule {
};
DeliveryPointModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([delivery_point_entity_1.DeliveryPoint])],
        controllers: [delivery_point_controller_1.DeliveryPointController],
        providers: [delivery_point_service_1.DeliveryPointService],
        exports: [delivery_point_service_1.DeliveryPointService],
    })
], DeliveryPointModule);
exports.DeliveryPointModule = DeliveryPointModule;
//# sourceMappingURL=delivery-point.module.js.map