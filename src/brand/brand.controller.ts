import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { BrandService } from './brand.service';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  // Create a new brand
  @Post()
  createBrand(
    @Body('name') name: string,
    @Body('dailyBudget') dailyBudget: number,
    @Body('monthlyBudget') monthlyBudget: number,
  ) {
    return this.brandService.createBrand(name, dailyBudget, monthlyBudget);
  }

  // Get all brands
  @Get()
  getAllBrands() {
    return this.brandService.getAllBrands();
  }

  // Update brand budget
  @Patch(':id/budget')
  updateBrandBudget(
    @Param('id') id: number,
    @Body('dailyBudget') dailyBudget: number,
    @Body('monthlyBudget') monthlyBudget: number,
  ) {
    return this.brandService.updateBrandBudget(id, dailyBudget, monthlyBudget);
  }
}
