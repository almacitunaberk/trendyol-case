import { Test, TestingModule } from '@nestjs/testing';
import { SackService } from './sack.service';

describe('SackService', () => {
  let service: SackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SackService],
    }).compile();

    service = module.get<SackService>(SackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
