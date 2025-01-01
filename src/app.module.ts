import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './database/database.module';
import { CampaignModule } from './campaign/campaign.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [DatabaseModule, ScheduleModule.forRoot(), CampaignModule, BrandModule],
})
export class AppModule {}
