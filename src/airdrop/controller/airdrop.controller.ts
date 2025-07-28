import { Controller, Post, Body, Get, Param, Put, Delete, UseInterceptors, UploadedFile, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AirdropService } from '../services/airdrop.service';
import { Airdrop } from '../entities/airdrop.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { CreateAirdropDto, UpdateAirdropDto } from '../dto/airdrop.dto';
// import { AuthGuard } from '../../auth/auth.guard';

@ApiTags('Airdrop')
// @ApiBearerAuth()
@Controller('airdrop')
export class AirdropController {
  constructor(private readonly airdropService: AirdropService) {}

  @Post('balance')
@UseInterceptors(FileInterceptor('file'))
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      senderSeed: { type: 'string', description: 'Sender seed for authentication' },
      file: { type: 'string', format: 'binary' },
    },
    required: ['senderSeed', 'file'],
  },
})
@ApiResponse({ status: 201, description: 'XON Airdrop from CSV file', type: [String] })
async uploadXonAirdropFile(
  @Req() req: Request,
  @Body('senderSeed') senderSeed: string, 
  @UploadedFile() file: Express.Multer.File
): Promise<string[]> {
  const role = req['user']?.role;
  if (role === 'user') {
    throw new BadRequestException('Unauthorized access');
  }
  return await this.airdropService.airdropBalance(senderSeed, file);
}

 @Post('asset')
@UseInterceptors(FileInterceptor('file'))
@ApiOperation({ summary: 'Airdrop asset with per-recipient balance and assetId from CSV' })
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      senderSeed: { type: 'string', description: 'Sender seed account' },
      file: { type: 'string', format: 'binary' },
    },
    required: ['senderSeed', 'file'],
  },
})
@ApiResponse({ status: 201, description: 'Airdrop processed from file with custom balances and asset IDs', type: [String] })
async uploadAirdropFile(
  @Req() req: Request,
  @Body('senderSeed') senderSeed: string, 
  @UploadedFile() file: Express.Multer.File
): Promise<string[]> {
  const role = req['user']?.role;
  if (role === 'user') {
    throw new BadRequestException('Unauthorized access');
  }

  return await this.airdropService.airdropAsset(senderSeed, file);
}

}  