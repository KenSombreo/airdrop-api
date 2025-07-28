import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AssetTransferService } from '../services/asset-transfer.service';
import {
  AssetTransferDto,
  BalanceTransferDto,
} from '../dto/asset-transfer.dto';
// import { AuthGuard } from '../../auth/auth.guard';

@ApiTags('Transfer')
@ApiBearerAuth()
@Controller('transfer')
export class AssetTransferController {
  constructor(private readonly assetTransferService: AssetTransferService) {}

  @Post('asset')
//   @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Transfer Assets to a recipient' })
  @ApiResponse({ status: 201, description: 'Asset transfer successful' })
  @ApiResponse({ status: 400, description: 'Missing required parameters' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async depositToken(@Body() depositDto: AssetTransferDto) {
    try {
      const senderSeed: string = process.env.ASSET_TRANSFER_ACCOUNT_SENDER ?? '//Alice';

      const result = await this.assetTransferService.depositToken(
        senderSeed,
        depositDto.assetId,
        depositDto.recipient,
        depositDto.conversionValue,
      );

      if (result.status === 'failed') {
        throw new HttpException(`❌ Asset transfer failed: ${result.message}`, HttpStatus.BAD_REQUEST);
      }

      return {
        orderId: depositDto.orderId,
        recipient: depositDto.recipient,
        message: '✅ Asset transfer successful',
        transactionHash: result.transactionHash,
        blockHash: result.blockHash,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('XON')
  @ApiOperation({ summary: 'Transfer XON to a recipient' })
  @ApiResponse({ status: 201, description: 'XON transfer successful' })
  @ApiResponse({ status: 400, description: 'Missing required parameters' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async transferXon(@Body() depositDto: BalanceTransferDto) {
    try {
      const senderSeed: string = process.env.ASSET_TRANSFER_ACCOUNT_SENDER ?? '//Alice';
      const assetId = 0;

      const result = await this.assetTransferService.transferXON(
        senderSeed,
        assetId,
        depositDto.recipient,
        depositDto.conversionValue,
      );

      if (result.status === 'failed') {
        throw new HttpException(`❌ XON transfer failed: ${result.message}`, HttpStatus.BAD_REQUEST);
      }

      return {
        orderId: depositDto.orderId,
        recipient: depositDto.recipient,
        message: '✅ XON transfer successful',
        transactionHash: result.transactionHash,
        blockHash: result.blockHash,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
