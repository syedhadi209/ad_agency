import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../database/entities/brand.entity';
import { Campaign } from '../database/entities/campaign.entity';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  /**
   * Daily Reset
   * Resets daily spend for all brands and activates campaigns that are within budget.
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleDailyReset(): Promise<void> {
    this.logger.log('Starting daily reset...');

    const brands = await this.brandRepository.find({
      relations: ['campaigns'],
    });

    for (const brand of brands) {
      brand.dailySpend = 0; // Reset daily spend

      // Reactivate campaigns if the daily budget allows
      for (const campaign of brand.campaigns) {
        if (brand.dailyBudget > 0) {
          campaign.isActive = true;
          await this.campaignRepository.save(campaign);
        }
      }

      await this.brandRepository.save(brand);
    }

    this.logger.log('Daily reset completed.');
  }

  /**
   * Monthly Reset
   * Resets monthly spend for all brands and activates campaigns that are within budget.
   */
  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async handleMonthlyReset(): Promise<void> {
    this.logger.log('Starting monthly reset...');

    const brands = await this.brandRepository.find({
      relations: ['campaigns'],
    });

    for (const brand of brands) {
      brand.monthlySpend = 0; // Reset monthly spend

      // Reactivate campaigns if the monthly budget allows
      for (const campaign of brand.campaigns) {
        if (brand.monthlyBudget > 0) {
          campaign.isActive = true;
          await this.campaignRepository.save(campaign);
        }
      }

      await this.brandRepository.save(brand);
    }

    this.logger.log('Monthly reset completed.');
  }
}
