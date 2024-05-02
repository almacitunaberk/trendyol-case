import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeliveryPointModule } from './delivery-point/delivery-point.module';
import { SackModule } from './sack/sack.module';
import { PackageModule } from './package/package.module';
import { DistributeModule } from './distribute/distribute.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { DeliveryPoint } from './delivery-point/entities/delivery-point.entity';
import { Package } from './package/entities/package.entity';
import { Sack } from './sack/entities/sack.entity';
import { SeederModule } from './seeder/seeder.module';
import { HealthModule } from './health/health.module';
import { IncorrectDeliveriesModule } from './incorrect-deliveries/incorrect-deliveries.module';
import { IncorrectDelivery } from './incorrect-deliveries/entities/incorrect-delivery.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          database: config.get<string>('DB_NAME'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          synchronize: true,
          entities: [DeliveryPoint, Package, Sack, IncorrectDelivery],
        };
      },
    }),
    DeliveryPointModule,
    SackModule,
    PackageModule,
    DistributeModule,
    SeederModule,
    HealthModule,
    IncorrectDeliveriesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
