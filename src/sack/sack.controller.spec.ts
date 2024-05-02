import { Test, TestingModule } from '@nestjs/testing';
import { SackController } from './sack.controller';

describe('SackController', () => {
  let controller: SackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SackController],
    }).compile();

    controller = module.get<SackController>(SackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
