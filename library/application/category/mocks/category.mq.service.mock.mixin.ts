import { Constructor } from '../../../utils/types/constructor';
import { Category } from '../entities/category';
import { ICategoryMqService } from '../ports/ICategoryMqService';
export function CategoryMqServiceMockMixin<Tbase extends Constructor>(
  Base: Tbase,
) {
  return class CategoryMqServiceMock
    extends Base
    implements ICategoryMqService
  {
    categories: Category[] = [];
    constructor(...args: any[]) {
      super(args);
    }

    sendNewCategory = (category: Category) => {
      this.categories.push(category);
    };

    sendUpdatedCategory = (category: Category) => {
      const index = this.categories.findIndex(
        (elem) => elem.id === category.id,
      );
      if (index > -1) {
        this.categories[index] = { ...category };
      }
    };
  };
}
