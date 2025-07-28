import { IsString, IsNumber, IsArray } from 'class-validator';

// Define DTO for Create Airdrop request
export class CreateAirdropDto {
  @IsString()
  senderSeed: string;

  @IsNumber()
  assetId: number;

  @IsString()
  recipients: string;

  @IsString()
  amount: string;

  @IsString()
  orderId: string;
  
  @IsString()
  status: string;

  @IsString()
  transactionHash: string;

  @IsString()
  blockHash: string;
  
}

// Define DTO for Update Airdrop request
export class UpdateAirdropDto {
  @IsString()
  senderSeed: string;

  @IsNumber()
  assetId: number;

  @IsString()
  recipients: string;

  @IsString()
  amount: string;

  @IsString()
  orderId: string;
  
  @IsString()
  status: string;

  @IsString()
  transactionHash: string;
  
  @IsString()
  blockHash: string;
}
