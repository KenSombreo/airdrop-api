import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Airdrop, AirdropDocument } from '../entities/airdrop.entity';
import { CreateAirdropDto } from '../dto/airdrop.dto';
import { AssetTransferService } from '../../asset-transfer/services/asset-transfer.service';
import { Readable } from 'stream';
import * as csv from 'csv-parser';

@Injectable()
export class AirdropService {
  constructor(
    @InjectModel(Airdrop.name) private airdropModel: Model<AirdropDocument>,
    private readonly assetTransferService: AssetTransferService,
  ) { }


  private async parseCsv(file: Express.Multer.File): Promise<{ address: string; amount: string }[]> {
    return new Promise((resolve, reject) => {
      const results: { address: string; amount: string }[] = [];
      Readable.from(file.buffer)
        .pipe(csv(['address', 'amount']))
        .on('data', (data) => {
          if (data.address && data.amount) {
            results.push({ address: data.address.trim(), amount: data.amount.trim() });
          }
        })
        .on('end', () => resolve(results))
        .on('error', (err) => reject(err));
    });
  }

  private async parseAssetCsv(file: Express.Multer.File): Promise<{ address: string; amount: string; assetId: string }[]> {
    return new Promise((resolve, reject) => {
      const results: { address: string; amount: string; assetId: string }[] = [];
      Readable.from(file.buffer)
        .pipe(csv(['address', 'amount', 'assetId']))
        .on('data', (data) => {
          if (data.address && data.amount && data.assetId) {
            results.push({
              address: data.address.trim(),
              amount: data.amount.trim(),
              assetId: data.assetId.trim(),
            });
          }
        })
        .on('end', () => resolve(results))
        .on('error', (err) => reject(err));
    });
  }


  async airdropBalance(senderSeed: string, file: Express.Multer.File): Promise<string[]> {
    const rows = await this.parseCsv(file);
    if (!rows.length) throw new Error('No valid rows found in file.');

    const assetId = 0;
    const orderId = `DOT-${new Date().toISOString()}`;
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const results = await Promise.allSettled(
      rows.map(async ({ address, amount }, index) => {
        try {
          await delay(index * 6000);
          const result = await this.assetTransferService.transferXON(senderSeed, assetId, address, amount);
          if (result.status === 'failed') throw new Error('Transfer failed');

          await new this.airdropModel({
            senderSeed,
            assetId,
            recipients: address,
            amount,
            orderId,
            status: result.status,
            transactionHash: result.transactionHash,
            blockHash: result.blockHash,
          }).save();

          return { recipient: address, success: true };
        } catch (err) {
          console.log(`❌ Failed for ${address}: ${err.message}`);
          return { recipient: address, success: false };
        }
      }),
    );

    return results
      .filter(r => r.status === 'fulfilled' && !(r as PromiseFulfilledResult<any>).value.success)
      .map(r => (r as PromiseFulfilledResult<any>).value.recipient);
  }


  async airdropAsset(senderSeed: string, file: Express.Multer.File): Promise<string[]> {
    const rows = await this.parseAssetCsv(file);
    if (!rows.length) throw new Error('No valid rows found in file.');

    const orderId = `ASSET-${new Date().toISOString()}`;
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const results = await Promise.allSettled(
      rows.map(async ({ address, amount, assetId }, index) => {
        try {
          await delay(index * 6000); // throttle to avoid congestion
          const assetResult = await this.assetTransferService.depositToken(senderSeed, +assetId, address, amount);
          if (assetResult.status === 'failed') throw new Error('Asset transfer failed');

          await new this.airdropModel({
            senderSeed,
            assetId: +assetId,
            recipients: address,
            amount: amount,
            orderId,
            status: assetResult.status,
            transactionHash: assetResult.transactionHash,
            blockHash: assetResult.blockHash,
          }).save();

          return { recipient: address, success: true };
        } catch (err) {
          console.log(`❌ Transfer failed for ${address}: ${err.message}`);
          return { recipient: address, success: false };
        }
      })
    );

    return results
      .filter(r => r.status === 'fulfilled' && !(r as PromiseFulfilledResult<any>).value.success)
      .map(r => (r as PromiseFulfilledResult<any>).value.recipient);
  }


  async createAirdrop(dto: CreateAirdropDto) {
    const newDrop = new this.airdropModel(dto);
    return await newDrop.save();
  }

  async findAllAirdrops(): Promise<Airdrop[]> {
    return await this.airdropModel.find().exec();
  }

  async findAirdropById(id: string): Promise<Airdrop> {
    const airdrop = await this.airdropModel.findById(id).exec();
    if (!airdrop) throw new Error(`Airdrop with ID ${id} not found`);
    return airdrop;
  }

  async updateAirdrop(id: string, updateData: Partial<Airdrop>): Promise<Airdrop> {
    const updated = await this.airdropModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!updated) throw new Error(`Airdrop with ID ${id} not found`);
    return updated;
  }

  async removeAirdrop(id: string): Promise<void> {
    const result = await this.airdropModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) throw new Error(`Airdrop with ID ${id} not found`);
  }
}
