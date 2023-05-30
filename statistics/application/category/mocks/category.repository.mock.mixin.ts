import { Constructor } from '../../../utils/types/constructor';
import { Category } from '../entities/category';
import { ICatagoryRepository } from '../ports/ICategoryRepository';

export function CategoryRepositoryMockMixin<TBase extends Constructor>(
  Base: TBase,
) {
  return class CategoryRepositoryMock
    extends Base
    implements ICatagoryRepository
  {
    categories: Category[] = [];

    constructor(...args: any[]) {
      super(args);
      this.categories = [];
    }

    async create(category: Category) {
      const newCategory = {
        id: (Math.random() + 1).toString(36).substring(7),
        ...category,
      };
      this.categories.push(newCategory);
      return Promise.resolve(newCategory);
    }

    async list() {
      return this.categories;
    }
  };
}
