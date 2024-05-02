import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { Package } from '../src/package/entities/package.entity';
import { packages } from '../predefinedData/packages';
import { PackageService } from '../src/package/package.service';
import { SackService } from '../src/sack/sack.service';
import { ShipmentState } from '../src/sack/entities/sack.entity';

export const packageTest = () =>
  describe('Package Endpoints (e2e)', () => {
    let app: INestApplication;
    let repository: Repository<Package>;
    let packageService: PackageService;
    let sackService: SackService;

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
      app = moduleFixture.createNestApplication();
      repository = moduleFixture.get('PackageRepository');
      packageService = moduleFixture.get<PackageService>(PackageService);
      sackService = moduleFixture.get<SackService>(SackService);
      await repository.query('DELETE FROM package WHERE true;');
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
      await Promise.all<any>(
        packages.map(async (_package) => {
          await repository.save(_package);
        })
      );
    });

    it('PackageService should be defined', () => {
      expect(packageService).toBeDefined();
    });

    it('SackService is defined', () => {
      expect(sackService).toBeDefined();
    });

    it('creates new package not belonging to a sack', async () => {
      const _package = { barcode: 'P7988000121', unloadDeliveryPoint: 1, desi: 5 };
      return request(app.getHttpServer())
        .post('/package')
        .send(_package)
        .expect(201)
        .then((res) => {
          const { barcode, unloadDeliveryPoint, desi } = res.body;
          expect(barcode).toEqual(_package.barcode);
          expect(desi).toEqual(_package.desi);
          expect(unloadDeliveryPoint).toEqual(_package.unloadDeliveryPoint);
        });
    });

    it('gets the package with correct barcode', async () => {
      return request(app.getHttpServer())
        .get('/package/P7988000121')
        .expect(200)
        .then((res) => {
          const { barcode, unloadDeliveryPoint, desi } = res.body;
          expect(barcode).toEqual('P7988000121');
          expect(desi).toEqual(5);
          expect(unloadDeliveryPoint).toEqual(1);
        });
    });

    it('creates new package belonging to a sack', async () => {
      const _package = { barcode: 'P8988000122', unloadDeliveryPoint: 2, sackBarcode: 'C725799', desi: 26 };
      return request(app.getHttpServer())
        .post('/package')
        .send(_package)
        .expect(201)
        .then((res) => {
          const { barcode, unloadDeliveryPoint, sackBarcode, desi } = res.body;
          expect(desi).toEqual(_package.desi);
          expect(barcode).toEqual(_package.barcode);
          expect(unloadDeliveryPoint).toEqual(_package.unloadDeliveryPoint);
          expect(sackBarcode).toEqual(_package.sackBarcode);
        });
    });

    it('checks if the sack contains the package', async () => {
      return request(app.getHttpServer())
        .get('/sack/C725799')
        .then((res) => {
          const { packages } = res.body;
          const barcodes = packages.map((_package) => _package.barcode);
          expect(barcodes).toContain('P8988000122');
        });
    });

    it('checks if the delivery ponint contains the package', async () => {
      return request(app.getHttpServer())
        .get('/delivery-point/2')
        .then((res) => {
          const { packages } = res.body;
          const barcodes = packages.map((_package) => _package.barcode);
          expect(barcodes).toContain('P8988000122');
        });
    });

    it('package is unloaded when the belonging sack is unloaded', async () => {
      await packageService.create('P8988000126', 2, 'C725799', 50);
      await sackService.unloadSack('C725799');
      const package1 = await packageService.findOne('P8988000122');
      const package2 = await packageService.findOne('P8988000126');
      expect(package1.state).toEqual(ShipmentState.Unloaded);
      expect(package2.state).toEqual(ShipmentState.Unloaded);
    });

    it('prevents assignment to a wrong sack barcode', async () => {
      await expect(packageService.create('TestingPackage', 2, 'NotExistingSackBarcode', 0)).rejects.toThrowError();
    });

    it('prevents assignment to a sack with different delivery point', async () => {
      await expect(packageService.create('TestingPackage', 3, 'C725799', 0)).rejects.toThrowError();
    });

    it('throws an error when an incorrect barcode is given', async () => {
      return request(app.getHttpServer()).get('/package/C725797').expect(404);
    });
  });
