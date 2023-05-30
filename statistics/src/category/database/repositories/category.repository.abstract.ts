import { Injectable } from '@nestjs/common';
import { Category } from 'application/category/entities/category';
import { ICatagoryRepository } from 'application/category/ports/ICategoryRepository';

@Injectable()
export abstract class AbstractCategoryRepository
  implements ICatagoryRepository
{
  public abstract create: (category: Category) => Promise<Category>;
  public abstract list: () => Promise<Category[]>;
}
