import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from 'src/database/entities/campaign.entity';
import { Brand } from 'src/database/entities/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign, Brand])],
  controllers: [CampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}
