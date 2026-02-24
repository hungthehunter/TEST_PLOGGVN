import { Controller, Post, Body, Inject } from '@nestjs/common';
import { IHubSpotService} from '../services/hubspot.services.interface';
import type { HubSpotContactDto } from '../services/hubspot.services.interface';
@Controller('hubspot')
export class HubSpotController {
  constructor(
    @Inject(IHubSpotService) 
    private readonly hubSpotService: IHubSpotService
  ) {}

  @Post('contacts')
  async createHubSpotContact(@Body() body: HubSpotContactDto) {
    const result = await this.hubSpotService.createContact(body);
    return {
      status: 'success',
      message: 'Contact created on HubSpot',
      data: result
    };
  }
}