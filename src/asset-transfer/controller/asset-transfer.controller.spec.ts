import { Test, TestingModule } from '@nestjs/testing';
import { AssetTransferController } from './asset-transfer.controller';

describe('AssetTransferController', () => {
  let controller: AssetTransferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetTransferController],
    }).compile();

    controller = module.get<AssetTransferController>(AssetTransferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
