import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './database/database.module';
import { CampaignModule } from './campaign/campaign.module';

@Module({
  imports: [DatabaseModule, ScheduleModule.forRoot(), CampaignModule],
})
export class AppModule {}
