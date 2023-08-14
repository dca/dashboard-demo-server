import { Test, TestingModule } from '@nestjs/testing';
import { OtelService } from './otel.service';

describe('OtelService', () => {
  let service: OtelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtelService],
    }).compile();

    service = module.get<OtelService>(OtelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
