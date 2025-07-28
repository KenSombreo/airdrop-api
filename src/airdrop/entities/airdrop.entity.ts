import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AirdropDocument = Airdrop & Document;

@Schema({ timestamps: true })
export class Airdrop {
  @Prop({ required: true })
  senderSeed: string;

  @Prop({ required: true })
  assetId: number;

  @Prop({ required: true })
  recipients: string;

  @Prop({ required: true })
  amount: string;

  @Prop({ required: true })
  orderId: string;

  @Prop()
  status: string;

  @Prop()
  transactionHash: string;

  @Prop()
  blockHash: string;
}

export const AirdropSchema = SchemaFactory.createForClass(Airdrop);
