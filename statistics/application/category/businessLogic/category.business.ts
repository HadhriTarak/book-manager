import { Category } from '../entities/category';
import { ICategoryBusiness } from '../ports/ICategoryBusiness';
import { ICatagoryRepository } from '../ports/ICategoryRepository';

export class CategoryBusiness implements ICategoryBusiness {
  constructor(private categoryRepository: ICatagoryRepository) {}

  public createCategory = async (category: Category) => {
    await this.categoryRepository.create(category);
  };
}
