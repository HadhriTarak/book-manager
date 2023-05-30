import { Category } from '../entities/category';

export interface ICatagoryRepository {
  create: (category: Category) => Promise<Category>;
  list: () => Promise<Category[]>;
}
