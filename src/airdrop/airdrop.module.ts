import { Module } from '@nestjs/common';
import { AirdropService } from './services/airdrop.service';
import { AirdropController } from './controller/airdrop.controller';
import { AssetTransferModule } from '../asset-transfer/asset-transfer.module';
import { Airdrop, AirdropSchema } from './entities/airdrop.entity';
import { PolkadotApiModule } from '../polkadot-api/polkadot-api.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Airdrop.name, schema: AirdropSchema }]), // Register AirdropRepository here
    AssetTransferModule,
    PolkadotApiModule
  ],
  providers: [AirdropService],
  controllers: [AirdropController]
})
export class AirdropModule {}
