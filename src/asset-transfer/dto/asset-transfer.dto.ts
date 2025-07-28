import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AssetTransferDto {
  @ApiProperty({ description: "Asset ID to transfer", example: 1 })
  @IsNumber()
  @IsNotEmpty()
  assetId: number;

  @ApiProperty({ description: "Email Address", example: "test@email.com" })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "Recipient's address", example: "5FHneW46xG...." })
  @IsString()
  @IsNotEmpty()
  recipient: string;

  @ApiProperty({ description: "Amount to transfer", example: 100 })
  @IsString()
  @IsNotEmpty()
  paidAmount: string;

  @ApiProperty({ description: "Conversion rate", example: 100 })
  @IsNumber()
  @IsNotEmpty()
  conversionRate: number;

  @ApiProperty({ description: "Asset value", example: 100 })
  @IsString()
  @IsNotEmpty()
  conversionValue: string;

  @ApiProperty({ description: "Unique Order ID", example: "00001..." })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ description: "Unique reference Id", example: "REF123...." })
  @IsString()
  @IsNotEmpty()
  referenceId: string;
}


export class BalanceTransferDto {
  @ApiProperty({ description: "Email Address", example: "test@email.com" })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "Recipient's address", example: "5FHneW46xG...." })
  @IsString()
  @IsNotEmpty()
  recipient: string;

  @ApiProperty({ description: "Amount to transfer", example: 100 })
  @IsString()
  @IsNotEmpty()
  paidAmount: string;

  @ApiProperty({ description: "Conversion rate", example: 100 })
  @IsNumber()
  @IsNotEmpty()
  conversionRate: number;

  @ApiProperty({ description: "Asset value", example: 100 })
  @IsString()
  @IsNotEmpty()
  conversionValue: string;

  @ApiProperty({ description: "Unique Order ID", example: "00001..." })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ description: "Unique reference Id", example: "REF123...." })
  @IsString()
  @IsNotEmpty()
  referenceId: string;
}
