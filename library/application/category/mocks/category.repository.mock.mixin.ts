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

    async update(id: string, category: Category) {
      const index = this.categories.findIndex((elem) => elem.id === id);
      if (index > -1) {
        this.categories[index] = { id, ...category };
        return this.categories[index];
      }
      return null;
    }

    async listAll() {
      return this.categories;
    }

    async getOneById(id: string) {
      return Promise.resolve(this.categories.find((elem) => elem.id === id));
    }
  };
}
