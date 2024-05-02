import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { DeliveryPoint } from '../src/delivery-point/entities/delivery-point.entity';
import { DeliveryPointService } from '../src/delivery-point/delivery-point.service';

export const deliveryPointTest = () =>
  describe('Delivery Point Endpoints (e2e)', () => {
    let app: INestApplication;
    let repository: Repository<DeliveryPoint>;
    let deliveryPointService: DeliveryPointService;

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
      app = moduleFixture.createNestApplication();
      repository = moduleFixture.get('DeliveryPointRepository');
      deliveryPointService = moduleFixture.get<DeliveryPointService>(DeliveryPointService);
      await repository.query('DELETE FROM delivery_point WHERE true;');
      await app.init();
    });

    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
      app = moduleFixture.createNestApplication();
      await app.init();
    });

    afterAll(async () => {
      let deliveryPoint1 = { name: 'Branch', value: 1 };
      let deliveryPoint2 = { name: 'Distribution Centre', value: 2 };
      let deliveryPoint3 = { name: 'Transfer Centre', value: 3 };
      await repository.save(deliveryPoint1);
      await repository.save(deliveryPoint2);
      await repository.save(deliveryPoint3);
    });

    it('DeliveryPointService is defined', () => {
      expect(deliveryPointService).toBeDefined();
    });

    it('DeliveryPoint Repository is defined', () => {
      expect(repository).toBeDefined();
    });

    it('creates new delivery point', async () => {
      const deliveryPoint = { name: 'Branch', value: 1 };
      return request(app.getHttpServer())
        .post('/delivery-point')
        .send(deliveryPoint)
        .expect(201)
        .then((res) => {
          const { name, value } = res.body;
          expect(name).toEqual(deliveryPoint.name);
          expect(value).toEqual(deliveryPoint.value);
        });
    });

    it('gets delivery point with correct id', async () => {
      return request(app.getHttpServer())
        .get('/delivery-point/1')
        .expect(200)
        .then((res) => {
          const { name, value } = res.body;
          expect(name).toEqual('Branch');
          expect(value).toEqual(1);
        });
    });

    it('throws an error when an incorrect id is given', () => {
      return request(app.getHttpServer()).get('/delivery-point/4').expect(404);
    });
  });
