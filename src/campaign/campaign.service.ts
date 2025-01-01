import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from '../database/entities/campaign.entity';
import { Brand } from '../database/entities/brand.entity';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  // Create campaign
  async createCampaign(name: string, brandId: number, activeHours: number[]) {
    const brand = await this.brandRepository.findOne({
      where: { id: brandId },
    });
    if (!brand) {
      throw new Error('Brand not found');
    }
    const campaign = this.campaignRepository.create({
      name,
      brand,
      activeHours,
    });
    return this.campaignRepository.save(campaign);
  }

  // Get all campaigns
  async getAllCampaigns() {
    return this.campaignRepository.find({ relations: ['brand'] });
  }

  // Update campaign status
  async updateCampaignStatus(id: number, isActive: boolean) {
    const campaign = await this.campaignRepository.findOne({ where: { id } });
    if (!campaign) {
      throw new Error('Campaign not found');
    }
    campaign.isActive = isActive;
    return this.campaignRepository.save(campaign);
  }
}
