import { Module } from '@nestjs/common';
import { AssetTransferService } from './services/asset-transfer.service';
import { AssetTransferController } from './controller/asset-transfer.controller';
import { PolkadotApiModule } from '../polkadot-api/polkadot-api.module';

@Module({
  imports: [PolkadotApiModule],
  controllers: [AssetTransferController],
  providers: [AssetTransferService],
  exports: [AssetTransferService], 
})
export class AssetTransferModule {}
