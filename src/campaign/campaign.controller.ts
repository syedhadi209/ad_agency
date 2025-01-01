import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { CampaignService } from './campaign.service';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  // Create a new campaign
  @Post()
  createCampaign(
    @Body('name') name: string,
    @Body('brandId') brandId: number,
    @Body('activeHours') activeHours: number[],
  ) {
    return this.campaignService.createCampaign(name, brandId, activeHours);
  }

  // Get all campaigns
  @Get()
  getAllCampaigns() {
    return this.campaignService.getAllCampaigns();
  }

  // Update campaign status (Activate/Deactivate)
  @Patch(':id/status')
  updateCampaignStatus(
    @Param('id') id: number,
    @Body('isActive') isActive: boolean,
  ) {
    return this.campaignService.updateCampaignStatus(id, isActive);
  }
}
