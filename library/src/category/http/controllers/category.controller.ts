import { AbstractCategoryRepository } from '../../database/repositories/category.repository.abstract';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryBusiness } from '../../../../application/category/businessLogic/category.business';
import { CreateCategoryDTO } from '../validation/createCategory.dto';
import { ICategoryBusiness } from '../../../../application/category/ports/ICategoryBusiness';
import { AbstractCategoryMqClient } from '../../mq/category.mq.client.abstract';
import { UpdateCategoryDTO } from '../validation/updateCategory.dto';

@Controller('category')
export class CategoryController {
  private categoryBusiness: ICategoryBusiness;
  constructor(
    private categoryMqClient: AbstractCategoryMqClient,
    private categoryRepository: AbstractCategoryRepository,
  ) {
    this.categoryBusiness = new CategoryBusiness(
      this.categoryRepository,
      this.categoryMqClient,
    );
  }

  @Post()
  async create(@Body() createCategoryDTO: CreateCategoryDTO) {
    const category = await this.categoryBusiness.createCategory(
      createCategoryDTO,
    );
    return category;
  }

  @Patch(':id')
  async update(@Param('id') id: string, updateCategoryDTO: UpdateCategoryDTO) {
    const category = await this.categoryBusiness.updateCategory(
      id,
      updateCategoryDTO,
    );
    if (category) return category;
    throw new NotFoundException('404 not found');
  }

  @Get()
  async listAll() {
    return this.categoryBusiness.listAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const category = await this.categoryBusiness.getOne(id);
    if (category) return category;
    throw new NotFoundException();
  }
}
