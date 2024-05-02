import { Test, TestingModule } from '@nestjs/testing';
import { IncorrectDeliveriesService } from './incorrect-deliveries.service';

describe('IncorrectDeliveriesService', () => {
  let service: IncorrectDeliveriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncorrectDeliveriesService],
    }).compile();

    service = module.get<IncorrectDeliveriesService>(IncorrectDeliveriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
