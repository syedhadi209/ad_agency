import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from '../database/entities/campaign.entity';

@Injectable()
export class CampaignCronService {
  private readonly logger = new Logger(CampaignCronService.name);

  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  // Run this cron job every hour
  @Cron(CronExpression.EVERY_HOUR)
  async checkDayparting() {
    const campaigns = await this.campaignRepository.find();
    const currentHour = new Date().getHours();

    for (const campaign of campaigns) {
      if (campaign.activeHours && !campaign.activeHours.includes(currentHour)) {
        // Deactivate campaign if current time is outside of active hours
        if (campaign.isActive) {
          campaign.isActive = false;
          await this.campaignRepository.save(campaign);
          this.logger.log(`Deactivated campaign: ${campaign.name}`);
        }
      } else {
        // Activate campaign if current time is within active hours
        if (!campaign.isActive) {
          campaign.isActive = true;
          await this.campaignRepository.save(campaign);
          this.logger.log(`Activated campaign: ${campaign.name}`);
        }
      }
    }
  }
}
