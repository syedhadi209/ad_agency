import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../database/entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  // Create brand
  async createBrand(name: string, dailyBudget: number, monthlyBudget: number) {
    const brand = this.brandRepository.create({
      name,
      dailyBudget,
      monthlyBudget,
    });
    return this.brandRepository.save(brand);
  }

  // Get all brands
  async getAllBrands() {
    return this.brandRepository.find({ relations: ['campaigns'] });
  }

  // Update brand budget
  async updateBrandBudget(
    id: number,
    dailyBudget: number,
    monthlyBudget: number,
  ) {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new Error('Brand not found');
    }
    brand.dailyBudget = dailyBudget;
    brand.monthlyBudget = monthlyBudget;
    return this.brandRepository.save(brand);
  }
}
