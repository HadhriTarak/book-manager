import { Injectable } from '@nestjs/common';
import { Category } from 'application/category/entities/category';
import { ICatagoryRepository } from 'application/category/ports/ICategoryRepository';

@Injectable()
export abstract class AbstractCategoryRepository
  implements ICatagoryRepository
{
  public abstract create: (category: Category) => Promise<Category>;
  public abstract update: (
    id: string,
    category: Category,
  ) => Promise<Category | null>;
  public abstract listAll: () => Promise<Category[]>;
  public abstract getOneById: (id: string) => Promise<Category>;
}
