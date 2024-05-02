import { Test, TestingModule } from '@nestjs/testing';
import { DistributeService } from './distribute.service';

describe('DistributeService', () => {
  let service: DistributeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistributeService],
    }).compile();

    service = module.get<DistributeService>(DistributeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
