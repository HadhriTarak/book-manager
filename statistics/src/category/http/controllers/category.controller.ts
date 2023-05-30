import { AbstractCategoryRepository } from '../../database/repositories/category.repository.abstract';
import { Controller } from '@nestjs/common';
import { CategoryBusiness } from '../../../../application/category/businessLogic/category.business';
import { ICategoryBusiness } from '../../../../application/category/ports/ICategoryBusiness';
import { Category } from '../../../../application/category/entities/category';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('category')
export class CategoryController {
  private categoryBusiness: ICategoryBusiness;
  constructor(private categoryRepository: AbstractCategoryRepository) {
    this.categoryBusiness = new CategoryBusiness(this.categoryRepository);
  }

  @MessagePattern({ cmd: 'new-category' })
  create(@Payload() category: Category) {
    return this.categoryBusiness.createCategory(category);
  }
}
