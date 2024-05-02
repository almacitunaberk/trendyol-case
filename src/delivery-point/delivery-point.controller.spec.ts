import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryPointController } from './delivery-point.controller';

describe('DeliveryPointController', () => {
  let controller: DeliveryPointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryPointController],
    }).compile();

    controller = module.get<DeliveryPointController>(DeliveryPointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
