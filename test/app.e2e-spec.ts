import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Repository } from 'typeorm';
import { DeliveryPoint } from 'src/delivery-point/entities/delivery-point.entity';
import { Sack } from 'src/sack/entities/sack.entity';
import { Package } from 'src/package/entities/package.entity';

export const appTest = () =>
  describe('AppController (e2e)', () => {
    let app: INestApplication;
    let packageRepository: Repository<Package>;
    let sackRepository: Repository<Sack>;
    let deliveryPointRepo: Repository<DeliveryPoint>;

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
      app = moduleFixture.createNestApplication();
      packageRepository = moduleFixture.get('PackageRepository');
      sackRepository = moduleFixture.get('SackRepository');
      deliveryPointRepo = moduleFixture.get('DeliveryPointRepository');
      await packageRepository.query('TRUNCATE package RESTART IDENTITY CASCADE');
      await sackRepository.query('TRUNCATE sack RESTART IDENTITY CASCADE');
      await deliveryPointRepo.query('TRUNCATE delivery_point RESTART IDENTITY CASCADE');
      await app.init();
    });

    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    });

    it('/ (GET)', () => {
      return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
    });
  });
