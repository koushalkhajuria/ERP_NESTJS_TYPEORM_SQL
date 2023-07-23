import { Test, TestingModule } from '@nestjs/testing';
import { SoService } from './so.service';

describe('SoService', () => {
  let service: SoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoService],
    }).compile();

    service = module.get<SoService>(SoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
