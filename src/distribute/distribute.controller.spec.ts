import { Test, TestingModule } from '@nestjs/testing';
import { DistributeController } from './distribute.controller';

describe('DistributeController', () => {
  let controller: DistributeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistributeController],
    }).compile();

    controller = module.get<DistributeController>(DistributeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
