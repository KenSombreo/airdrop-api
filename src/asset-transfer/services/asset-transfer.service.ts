import { Injectable } from '@nestjs/common';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { config } from 'dotenv';
import { PolkadotApiService } from '../../polkadot-api/services/polkadot-api.service';

config();

@Injectable()
export class AssetTransferService {
  private api: ApiPromise;

  constructor(private readonly polkadotApiService: PolkadotApiService) {}

  async transferXON(senderSeed: string, assetId: number, recipient: string, amount: string) 
  : Promise<{ status: string, transactionHash: string, blockHash: string, message?: string }> {
    try {
      const api = await this.polkadotApiService.getApi();
      const keyring = new Keyring({ type: 'sr25519' });
      const sender = keyring.addFromUri(senderSeed);
      
      const transfer = api.tx.balances.transferKeepAlive(recipient, amount); // 0.1 XON (assuming 10^10 decimal places)
      
      return new Promise((resolve, reject) => {
        transfer.signAndSend(sender, ({ status, txHash, events }) => {
          if (status.isFinalized) {
            let success = false;
            let dispatchError = '';
            events.forEach(({ event }) => {
              const { section, method, data } = event;
              console.log(`ExtrinsicSuccess : ${event.method}`);
              if (section === 'system' && method === 'ExtrinsicSuccess') {
                success = true;
              }
              if (section === 'system' && method === 'ExtrinsicFailed') {
                dispatchError = JSON.stringify(data);
                console.log(`dispatchError : ${dispatchError}`);
              }
            });

            resolve({
              status: success ? 'success' : 'failed',
              transactionHash: txHash.toHex(),
              blockHash: status.asFinalized.toString(),
              message: dispatchError,
            });
          }
        }).catch((error) => {
          reject(new Error(`❌ XON Transfer failed: ${error.message}`));
        });
      });

    } catch (error) {
      throw new Error(`❌ XON Transfer failed: ${error.message}`);
    }
  }


  async depositToken(senderSeed: string, assetId: number, recipient: string, amount: string): Promise<{ status:string, transactionHash: string, blockHash:string, message?: string }> {
    try {
      const api = await this.polkadotApiService.getApi();
  
      const keyring = new Keyring({ type: 'sr25519' });
      const sender = keyring.addFromUri(senderSeed);

          // Fetch latest nonce
      const nonce = await api.rpc.system.accountNextIndex(sender.address);
    // Increase transaction priority by adding a tip
    // const tip = api.registry.createType('Compact<Balance>', 1000000000);
      const tip = 52100000;
  
      const transfer = api.tx.assets.transfer(assetId, recipient, amount);
  
      return new Promise((resolve, reject) => {
        transfer.signAndSend(sender, { nonce, tip },({ status, txHash, events }) => {
          if (status.isFinalized) {
            let success = false;
            let dispatchError = '';
            events.forEach(({ event }) => {
              const { section, method, data } = event;
              console.log(`ExtrinsicSuccess : ${event.method}`);
              if (section === 'system' && method === 'ExtrinsicSuccess') {
                success = true;
              }

              if (section === 'system' && method === 'ExtrinsicFailed') {
                dispatchError = JSON.stringify(data);
                console.log(`dispatchError : ${dispatchError}`);
              }
            });

            resolve({
              status: success ? 'success' : 'failed',
              transactionHash: txHash.toHex(), // ✅ Return the extrinsic hash
              blockHash: status.asFinalized.toString(),
              message: dispatchError,
            });
          }
        }).catch((error) => {
          console.error(`❌ Transaction failed: ${error.message}`);
          reject({ status: 'failed', transactionHash: '', blockHash: '', message: error.message });
        });
      });
    } catch (error) {
      // throw new Error(`❌ Transaction failed: ${error.message}`);
      console.error(`❌ Transaction failed: ${error.message}`);
      return { status: 'failed', transactionHash: '', blockHash: '', message: error.message };
    }
  }  
}
