import { Category } from '../entities/category';
import { ICategoryBusiness } from '../ports/ICategoryBusiness';
import { ICategoryMqService } from '../ports/ICategoryMqService';
import { ICatagoryRepository } from '../ports/ICategoryRepository';

export class CategoryBusiness implements ICategoryBusiness {
  constructor(
    private categoryRepository: ICatagoryRepository,
    private categoryMqService: ICategoryMqService,
  ) {}

  public createCategory = async (category: Category) => {
    const newCategory: Category = await this.categoryRepository.create(
      category,
    );
    await this.categoryMqService.sendNewCategory(newCategory);
    return newCategory;
  };

  public updateCategory = async (id: string, category: Category) => {
    const updatedCategory = await this.categoryRepository.update(id, category);
    if (updatedCategory) {
      this.categoryMqService.sendUpdatedCategory(updatedCategory);
    }
    return updatedCategory;
  };

  public listAll = async () => {
    return this.categoryRepository.listAll();
  };

  public getOne = async (id: string) => this.categoryRepository.getOneById(id);
}
