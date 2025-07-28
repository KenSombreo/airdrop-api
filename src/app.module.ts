import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PolkadotApiModule } from './polkadot-api/polkadot-api.module';
import { AirdropModule } from './airdrop/airdrop.module';
import { AssetTransferModule } from './asset-transfer/asset-transfer.module';
import { Airdrop, AirdropSchema } from './airdrop/entities/airdrop.entity';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost/airdrop'),
    PolkadotApiModule,
    AirdropModule,
    AssetTransferModule,
  ],
  // controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
