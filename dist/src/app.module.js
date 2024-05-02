"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const delivery_point_module_1 = require("./delivery-point/delivery-point.module");
const sack_module_1 = require("./sack/sack.module");
const package_module_1 = require("./package/package.module");
const distribute_module_1 = require("./distribute/distribute.module");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const delivery_point_entity_1 = require("./delivery-point/entities/delivery-point.entity");
const package_entity_1 = require("./package/entities/package.entity");
const sack_entity_1 = require("./sack/entities/sack.entity");
const seeder_module_1 = require("./seeder/seeder.module");
const health_module_1 = require("./health/health.module");
const incorrect_deliveries_module_1 = require("./incorrect-deliveries/incorrect-deliveries.module");
const incorrect_delivery_entity_1 = require("./incorrect-deliveries/entities/incorrect-delivery.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.${process.env.NODE_ENV}.env`,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    return {
                        type: 'postgres',
                        host: config.get('DB_HOST'),
                        port: config.get('DB_PORT'),
                        database: config.get('DB_NAME'),
                        username: config.get('DB_USERNAME'),
                        password: config.get('DB_PASSWORD'),
                        synchronize: true,
                        entities: [delivery_point_entity_1.DeliveryPoint, package_entity_1.Package, sack_entity_1.Sack, incorrect_delivery_entity_1.IncorrectDelivery],
                    };
                },
            }),
            delivery_point_module_1.DeliveryPointModule,
            sack_module_1.SackModule,
            package_module_1.PackageModule,
            distribute_module_1.DistributeModule,
            seeder_module_1.SeederModule,
            health_module_1.HealthModule,
            incorrect_deliveries_module_1.IncorrectDeliveriesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_PIPE,
                useValue: new common_1.ValidationPipe({
                    whitelist: true,
                }),
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map