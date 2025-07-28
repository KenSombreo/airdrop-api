import { Controller } from '@nestjs/common';
import { PolkadotApiService } from '../services/polkadot-api.service';

@Controller()
export class PolkadotApiController {
  constructor(private readonly polkadotApiService: PolkadotApiService) {}
}
