"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const incorrect_deliveries_module_1 = require("../incorrect-deliveries/incorrect-deliveries.module");
const package_module_1 = require("../package/package.module");
const sack_module_1 = require("../sack/sack.module");
const package_entity_1 = require("../package/entities/package.entity");
const sack_entity_1 = require("../sack/entities/sack.entity");
const distribute_controller_1 = require("./distribute.controller");
const distribute_service_1 = require("./distribute.service");
let DistributeModule = class DistributeModule {
};
DistributeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([package_entity_1.Package]),
            typeorm_1.TypeOrmModule.forFeature([sack_entity_1.Sack]),
            package_module_1.PackageModule,
            sack_module_1.SackModule,
            incorrect_deliveries_module_1.IncorrectDeliveriesModule,
        ],
        controllers: [distribute_controller_1.DistributeController],
        providers: [distribute_service_1.DistributeService],
    })
], DistributeModule);
exports.DistributeModule = DistributeModule;
//# sourceMappingURL=distribute.module.js.map