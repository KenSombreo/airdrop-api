import { Module } from '@nestjs/common';
import { PolkadotApiService } from './services/polkadot-api.service';
import { PolkadotApiController } from './controller/polkadot-api.controller';

@Module({
  // controllers: [PolkadotApiController],
  providers: [PolkadotApiService],
  exports: [PolkadotApiService], 
})
export class PolkadotApiModule {}
