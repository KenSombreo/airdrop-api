import { Test, TestingModule } from '@nestjs/testing';
import { PolkadotApiController } from './polkadot-api.controller';
import { PolkadotApiService } from './polkadot-api.service';

describe('PolkadotApiController', () => {
  let controller: PolkadotApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PolkadotApiController],
      providers: [PolkadotApiService],
    }).compile();

    controller = module.get<PolkadotApiController>(PolkadotApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
