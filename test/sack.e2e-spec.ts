import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { Sack, ShipmentState } from '../src/sack/entities/sack.entity';
import { SackService } from '../src/sack/sack.service';
import { Package } from '../src/package/entities/package.entity';
import { PackageService } from '../src/package/package.service';

export const sackTest = () =>
  describe('Sack Endpoints (e2e)', () => {
    let app: INestApplication;
    let repository: Repository<Sack>;
    let sackService: SackService;
    let packageService: PackageService;

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
      app = moduleFixture.createNestApplication();
      repository = moduleFixture.get('SackRepository');
      sackService = moduleFixture.get<SackService>(SackService);
      packageService = moduleFixture.get<PackageService>(PackageService);
      await repository.query('DELETE FROM sack WHERE true;');
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
      let sack1 = repository.create({ barcode: 'C725799', unloadDeliveryPoint: 2 });
      let sack2 = repository.create({ barcode: 'C725800', unloadDeliveryPoint: 3 });
      await repository.save(sack1);
      await repository.save(sack2);
    });

    it('SackService is defined', () => {
      expect(sackService).toBeDefined();
    });

    it('PackageService is defined', () => {
      expect(packageService).toBeDefined();
    });

    it('creates new sack', async () => {
      const sack = { barcode: 'C725799', unloadDeliveryPoint: 2 };
      return request(app.getHttpServer())
        .post('/sack')
        .send(sack)
        .expect(201)
        .then((res) => {
          const { barcode, unloadDeliveryPoint } = res.body;
          expect(barcode).toEqual(sack.barcode);
          expect(unloadDeliveryPoint).toEqual(sack.unloadDeliveryPoint);
        });
    });

    it('gets the sack with correct barcode', async () => {
      return request(app.getHttpServer())
        .get('/sack/C725799')
        .expect(200)
        .then((res) => {
          const { barcode, unloadDeliveryPoint } = res.body;
          expect(barcode).toEqual('C725799');
          expect(unloadDeliveryPoint).toEqual(2);
        });
    });

    it('checks if the delivery point contains the sack', async () => {
      return request(app.getHttpServer())
        .get('/delivery-point/2')
        .then((res) => {
          const { sacks } = res.body;
          const barcodes = sacks.map((sack) => sack.barcode);
          expect(barcodes).toContain('C725799');
        });
    });

    it('packages are unloaded when sack is unloaded', async () => {
      await packageService.create('P8988000122', 2, 'C725799', 26);
      await packageService.create('P8988000126', 2, 'C725799', 50);
      const sack = await sackService.unloadSack('C725799');
      const packageBarcodes = sack.packages.map((p) => p.barcode);
      expect(sack.state).toEqual(ShipmentState.Unloaded);
      let _package: Package;
      for (let barcode of packageBarcodes) {
        _package = await packageService.findOne(barcode);
        expect(_package.state).toEqual(ShipmentState.Unloaded);
      }
    });

    it('sack is unloaded when all packages are unloaded', async () => {
      await sackService.create('C725800', 3);
      await packageService.create('P9988000128', 3, 'C725800', 55);
      await packageService.create('P9988000129', 3, 'C725800', 28);
      let sack = await sackService.findOne('C725800');
      const packageBarcodes = sack.packages.map((p) => p.barcode);
      for (let packageBarcode of packageBarcodes) {
        await packageService.unloadPackage(packageBarcode);
      }
      sack = await sackService.findOne('C725800');
      expect(sack.state).toEqual(ShipmentState.Unloaded);
    });

    it('throws an error when an incorrect barcode is given', async () => {
      return request(app.getHttpServer()).get('/sack/C725797').expect(404);
    });
  });
