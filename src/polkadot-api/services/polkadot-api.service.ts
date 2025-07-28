import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { config } from 'dotenv';
import { Keyring } from '@polkadot/keyring';

config();


@Injectable()
export class PolkadotApiService {
  private api: ApiPromise;

  async onModuleInit() {
    await this.initApi();
  }


  private async initApi() {
    if (!this.api) {
      const keyring = new Keyring();
      keyring.setSS58Format(280); // ✅ preferred way
      const provider = new WsProvider(process.env.XODE_RPC_ENPOINT);
      this.api = await ApiPromise.create({ provider });

      await this.api.isReady;
      console.log('✅ Connected to Xode RPC');
      const alice = keyring.addFromUri('//Alice');
      console.log(alice.address); 

    }
  }

  async getApi(): Promise<ApiPromise> {
    if (!this.api) {
      await this.initApi();
    }
    return this.api;
  }


  async onModuleDestroy() {
    if (this.api) {
      await this.api.disconnect();
      console.log('❌ Disconnected from Xode RPC');
    }
  }
}
