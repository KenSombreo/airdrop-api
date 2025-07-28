import { Test, TestingModule } from '@nestjs/testing';
import { AssetTransferService } from './asset-transfer.service';

describe('AssetTransferService', () => {
  let service: AssetTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetTransferService],
    }).compile();

    service = module.get<AssetTransferService>(AssetTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
